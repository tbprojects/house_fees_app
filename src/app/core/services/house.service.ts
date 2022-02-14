import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { catchError, lastValueFrom, mapTo, of, tap } from 'rxjs';
import { dateDbFormat } from 'utils/date-db-format';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from '../tokens/api-url';
import { Fee } from '../types/fee';
import { House } from '../types/house';
import { DbClient } from './db-client';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(
    private db: DbClient,
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }

  getAll(): Observable<House[]> {
    return liveQuery(() => this.db.houses
      .filter(house => !house.removedAt)
      .toArray()
    );
  }

  getLastActive(): Promise<House | null> {
    return this.db.houses
      .orderBy('lastActiveAt')
      .filter(house => !house.removedAt)
      .reverse().first().then(house => house ?? null);
  }

  get(uuid: string): Promise<House | null> {
    return this.db.houses.get(uuid).then(house => house ?? null);
  }

  save(house: House): Promise<House> {
    if (house.uuid) {
      return this.update(house);
    } else {
      return this.create(house);
    }
  }

  create(house: House): Promise<House> {
    house.uuid ??= uuidv4();
    house.updatedAt = dateDbFormat();
    return this.db.houses.add(house).then(uuid => this.db.houses.get(uuid)).then(house => house!);
  }

  update(house: House): Promise<House> {
    house.updatedAt = dateDbFormat();
    return this.db.houses.update(house.uuid!, house).then(() => house);
  }

  updateLastActiveAt(house: House): Promise<House> {
    const updatedHouse = {...house, lastActiveAt: Date.now()};
    return this.db.houses.update(house.uuid!, updatedHouse).then(() => updatedHouse);
  }

  remove(uuid: string): Promise<string> {
    const changes: Partial<House> = {updatedAt: dateDbFormat(), removedAt: dateDbFormat()};
    return this.db.houses.update(uuid, changes).then(() => uuid);
  }

  async sync(uuid: string): Promise<boolean> {
    const house = await this.db.houses.get(uuid);
    if (!house) {
      console.error(new Error(`missing house with uuid: ${uuid}`));
      return false;
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
        mapTo(true),
        tap({error: console.error}),
        catchError(() => of(false))
      )
    );
  }
}
