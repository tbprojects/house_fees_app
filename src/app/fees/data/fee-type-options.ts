import { FeeType } from 'core/types/fee-type';

export const feeTypeOptions: Array<{label: string, value: FeeType}> = [
  {label: $localize `Water`, value: FeeType.water},
  {label: $localize `Heating`, value: FeeType.heating},
  {label: $localize `Energy`, value: FeeType.energy},
  {label: $localize `Internet`, value: FeeType.internet},
  {label: $localize `Garbage`, value: FeeType.garbage},
  {label: $localize `Property Tax`, value: FeeType.propertyTax},
]
