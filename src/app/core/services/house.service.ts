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
      house.version ??= 0;
      house.version++;
      return this.db.houses.update(house.uuid, house).then(() => house);
    } else {
      house.uuid = uuidv4();
      house.version = 1;
      return this.db.houses.add(house).then(uuid => this.db.houses.get(uuid)).then(house => house!);
    }
  }

  updateLastActiveAt(house: House): Promise<House> {
    const updatedHouse = {...house, lastActiveAt: Date.now()};
    return this.db.houses.update(house.uuid!, updatedHouse).then(() => updatedHouse);
  }

  remove(uuid: string): Promise<string> {
    return this.db.houses.delete(uuid)
      .then(() => this.db.fees.where('houseUuid').equals(uuid).delete())
      .then(() => uuid);
  }
}
