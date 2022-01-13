import { formatNumber } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { Fee } from 'core/types/fee';

@Pipe({
  name: 'feeRate'
})
export class FeeRatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private localeId: string) {
  }

  transform(fee: Fee): string {
    return `${formatNumber(fee.value / fee.quantity, this.localeId, '1.2-2')} / ${fee.unit}`;
  }

}
