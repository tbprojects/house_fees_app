import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, concatMap, lastValueFrom, mapTo, of, Subject, tap } from 'rxjs';
import { dateDbFormat } from 'utils/date-db-format';
import { API_URL } from '../tokens/api-url';
import { Fee } from '../types/fee';
import { House } from '../types/house';
import { SyncStatus } from '../types/sync-status';
import { DbClient } from './db-client';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private syncRequests = new Subject<string>();
  syncStatus = new Subject<SyncStatus>();

  constructor(
    private db: DbClient,
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {
    this.syncRequests
      .pipe(concatMap((uuid) => this.sync(uuid)))
      .subscribe(status => this.syncStatus.next(status))
  }

  requestSync(uuid: string): void {
    this.syncRequests.next(uuid);
  }

  async sync(uuid: string): Promise<SyncStatus> {
    const house = await this.db.houses.get(uuid);

    if (!house) {
      console.error(new Error(`invalid uuid: ${uuid}`));
      return SyncStatus.InvalidUuid;
    }
    if (!house.syncEnabled) {
      return SyncStatus.Disabled;
    }

    const fees = await this.db.fees
      .where({houseUuid: uuid})
      .filter((fee) => !house.syncedAt || (fee.updatedAt ?? '') > house.syncedAt)
      .toArray();

    return lastValueFrom(
      this.http.post<{house: House, fees: Fee[]}>(`${this.apiUrl}/sync`, {house: house, fees}).pipe(
        tap((syncedPayload) => {
          const syncedAt = dateDbFormat();
          this.db.houses.put({...house, ...syncedPayload.house, syncedAt})
          this.db.fees.bulkPut(syncedPayload.fees);
        }),
        mapTo(SyncStatus.Ok),
        tap({error: console.error}),
        catchError(() => of(SyncStatus.Error))
      )
    )
  }
}
