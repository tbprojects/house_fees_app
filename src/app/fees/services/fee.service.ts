import { Injectable } from '@angular/core';
import { DbClient } from 'core/services/db-client';
import { Fee } from 'core/types/fee';
import { liveQuery, Observable } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor(private db: DbClient) { }

  getAll(): Observable<Fee[]> {
    return liveQuery(() => this.db.fees.reverse().sortBy('endAt'));
  }

  get(id: number): Promise<Fee | null> {
    return this.db.fees.get(id).then(fee => fee ?? null);
  }

  save(fee: Fee): Promise<number> {
    if (fee.id) {
      return this.db.fees.update(fee.id, fee);
    } else {
      delete fee.id;
      return this.db.fees.add(fee);
    }
  }

  remove(id: number): Promise<void> {
    return this.db.fees.delete(id);
  }

}
