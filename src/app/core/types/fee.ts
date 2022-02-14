import { FeeType } from './fee-type';

export interface Fee {
  uuid?: string;
  houseUuid?: string;
  removedAt?: string;
  updatedAt?: string;
  type: FeeType | null;
  quantity: number;
  unit: string;
  startAt: string;
  endAt: string;
  value: number;
}
