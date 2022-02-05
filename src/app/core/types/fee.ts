import { FeeType } from './fee-type';

export interface Fee {
  uuid?: string;
  version?: number;
  houseUuid?: string;
  type: FeeType | null;
  quantity: number;
  unit: string;
  startAt: string;
  endAt: string;
  value: number;
}
