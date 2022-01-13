import { FeeType } from 'core/types/fee-type';

interface FeeConfig {
  label: string;
  unit: string;
  color: string;
}

export const feeConfig = new Map<FeeType, FeeConfig>([
  [FeeType.water, {label: $localize `Water`, unit: $localize `m3`, color: '#2196f3'}],
  [FeeType.heating, {label: $localize `Heating`, unit: $localize `kWh`, color: '#f44336'}],
  [FeeType.energy, {label: $localize `Energy`, unit: $localize `kWh`, color: '#ffc107'}],
  [FeeType.internet, {label: $localize `Internet`, unit: $localize `month`, color: '#4caf50'}],
  [FeeType.garbage, {label: $localize `Garbage`, unit: $localize `month`, color: '#9e9e9e'}],
])
