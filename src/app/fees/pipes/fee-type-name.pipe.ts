import { Pipe, PipeTransform } from '@angular/core';
import { FeeType } from 'core/types/fee-type';
import { feeTypeOptions } from '../data/fee-type-options';

@Pipe({
  name: 'feeTypeName'
})
export class FeeTypeNamePipe implements PipeTransform {

  transform(feeType: FeeType): string {
    return feeTypeOptions.find(option => option.value === feeType)?.label ?? '';
  }

}
