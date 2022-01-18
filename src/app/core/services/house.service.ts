import { Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { House } from '../types/house';
import { DbClient } from './db-client';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private db: DbClient) { }

  getAll(): Observable<House[]> {
    return liveQuery(() => this.db.houses.toArray());
  }

  getLastActive(): Promise<House | null> {
    return this.db.houses.orderBy('lastActiveAt').reverse().first().then(house => house ?? null);
  }

  get(uuid: string): Promise<House | null> {
    return this.db.houses.get(uuid).then(house => house ?? null);
  }

  save(house: House): Promise<House> {
    if (house.uuid) {
      return this.db.houses.update(house.uuid, house).then(() => house);
    } else {
      const house = {uuid: uuidv4()};
      return this.db.houses.add(house).then(uuid => this.db.houses.get(uuid)).then(house => house!);
    }
  }

  remove(uuid: string): Promise<void> {
    return this.db.houses.delete(uuid);
  }
}
