import { FeeType } from './fee-type';

export interface Fee {
  uuid?: string;
  houseUuid?: string;
  createdAt?: string;
  updatedAt?: string;
  removedAt?: string;
  type: FeeType | null;
  quantity: number;
  unit: string;
  startAt: string;
  endAt: string;
  value: number;
}
