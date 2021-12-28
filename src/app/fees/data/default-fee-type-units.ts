import { FeeType } from 'core/types/fee-type';

export const defaultFeeTypeUnits = new Map<FeeType, string>([
  [FeeType.water, $localize `m3`],
  [FeeType.heating, $localize `kWh`],
  [FeeType.energy, $localize `kWh`],
  [FeeType.internet, $localize `month`],
  [FeeType.garbage, $localize `month`],
  [FeeType.propertyTax, $localize `year`],
])
