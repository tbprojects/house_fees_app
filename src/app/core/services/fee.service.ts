import { Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { dateDbFormat } from 'utils/date-db-format';
import { v4 as uuidv4 } from 'uuid';
import { Fee } from '../types/fee';
import { DbClient } from './db-client';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private db: DbClient) { }

  getAll(houseUuid: string): Observable<Fee[]> {
    return liveQuery(
      () => this.db.fees
        .where({houseUuid})
        .filter(fee => !fee.removedAt)
        .reverse()
        .sortBy('endAt')
    );
  }

  get(uuid: string): Promise<Fee | null> {
    return this.db.fees.get(uuid).then(fee => fee ?? null);
  }

  save(fee: Fee): Promise<Fee> {
    if (fee.uuid) {
      return this.update(fee);
    } else {
      return this.create(fee);
    }
  }

  create(fee: Fee): Promise<Fee> {
    fee.uuid ??= uuidv4();
    fee.updatedAt = dateDbFormat();
    return this.db.fees.add(fee).then(uuid => this.db.fees.get(uuid)).then(fee => fee!);
  }

  update(fee: Fee): Promise<Fee> {
    fee.updatedAt = dateDbFormat();
    return this.db.fees.update(fee.uuid!, fee).then(() => fee);
  }

  remove(uuid: string): Promise<string> {
    const changes: Partial<Fee> = {updatedAt: dateDbFormat(), removedAt: dateDbFormat()}
    return this.db.fees.update(uuid, changes).then(() => uuid);
  }

}
