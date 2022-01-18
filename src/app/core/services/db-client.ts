import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Fee } from '../types/fee';
import { House } from '../types/house';

@Injectable()
export class DbClient extends Dexie {
  fees!: Table<Fee, string>;
  houses!: Table<House, string>;

  constructor() {
    super('HouseFees');
    this.version(1).stores({
      fees: 'uuid,houseUuid',
      houses: 'uuid,lastActiveAt'
    })
  }
}
