import { Injectable } from '@angular/core';
import { liveQuery, Observable } from 'dexie';
import { dateDbFormat } from 'utils/date-db-format';
import { v4 as uuidv4 } from 'uuid';
import { House } from '../types/house';
import { DbClient } from './db-client';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private db: DbClient) { }

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

  updateLastActiveAt(uuid: string): Promise<string> {
    const changes: Partial<House> = {lastActiveAt: Date.now()}
    return this.db.houses.update(uuid, changes).then(() => uuid);
  }

  enableSync(uuid: string): Promise<string> {
    const changes: Partial<House> = {syncEnabled: true};
    return this.db.houses.update(uuid, changes).then(() => uuid);
  }

  disableSync(uuid: string): Promise<string> {
    const changes: Partial<House> = {syncEnabled: false};
    return this.db.houses.update(uuid, changes).then(() => uuid);
  }

  remove(uuid: string): Promise<string> {
    const changes: Partial<House> = {updatedAt: dateDbFormat(), removedAt: dateDbFormat()};
    return this.db.houses.update(uuid, changes).then(() => uuid);
  }
}
