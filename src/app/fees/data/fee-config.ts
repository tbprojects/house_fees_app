import { FeeType } from 'core/types/fee-type';

export interface FeeConfig {
  label: string;
  unit: string;
  color: string;
  icon: string;
}

export const feeConfig = new Map<FeeType, FeeConfig>([
  [FeeType.water, {label: $localize `Water`, unit: $localize `m3`, color: '#2196f3', icon: 'water_drop'}],
  [FeeType.heating, {label: $localize `Heating`, unit: $localize `kWh`, color: '#f44336', icon: 'thermostat'}],
  [FeeType.energy, {label: $localize `Energy`, unit: $localize `kWh`, color: '#ffc107', icon: 'bolt'}],
  [FeeType.internet, {label: $localize `Internet`, unit: $localize `month`, color: '#4caf50', icon: 'wifi'}],
  [FeeType.garbage, {label: $localize `Garbage`, unit: $localize `month`, color: '#9e9e9e', icon: 'delete_sweep'}],
  [FeeType.rent, {label: $localize `Rent`, unit: $localize `month`, color: '#d000ff', icon: 'apartment'}],
  [FeeType.other, {label: $localize `Other`, unit: $localize ``, color: '#00526c', icon: 'payments'}],
])
