import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Fee } from '../types/fee';

@Injectable()
export class DbClient extends Dexie {
  fees!: Table<Fee, number>;

  constructor() {
    super('HouseFees');
    this.version(1).stores({
      fees: '++id'
    })
  }
}
