import { FeeType } from './fee-type';

export interface Fee {
  id?: number;
  type: FeeType | null;
  quantity: number;
  unit: string;
  startAt: string;
  endAt: string;
  value: number;
}
