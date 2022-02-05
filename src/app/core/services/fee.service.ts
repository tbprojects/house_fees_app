import { Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { Fee } from '../types/fee';
import { DbClient } from './db-client';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private db: DbClient) { }

  getAll(houseUuid: string): Observable<Fee[]> {
    return liveQuery(() => this.db.fees.where('houseUuid').equals(houseUuid).reverse().sortBy('endAt'));
  }

  get(uuid: string): Promise<Fee | null> {
    return this.db.fees.get(uuid).then(fee => fee ?? null);
  }

  save(fee: Fee): Promise<Fee> {
    if (fee.uuid) {
      fee.version ??= 0;
      fee.version++;
      return this.db.fees.update(fee.uuid, fee).then(() => fee);
    } else {
      fee.uuid = uuidv4()
      fee.version = 1;
      return this.db.fees.add(fee).then(uuid => this.db.fees.get(uuid)).then(fee => fee!);
    }
  }

  remove(uuid: string): Promise<string> {
    return this.db.fees.delete(uuid).then(() => uuid);
  }

}
