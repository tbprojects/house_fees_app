import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Fee } from 'core/types/fee';
import { FeeService } from './fee.service';

@Injectable({
  providedIn: 'root'
})
export class FeeResolver implements Resolve<Fee> {
  constructor(private feeService: FeeService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Fee> {
    const id = route.paramMap.get('id')!;

    // new fee
    if (id === 'new') {
      const fee: Fee = {endAt: '', quantity: 1, startAt: '', type: null, unit: '', value: 0};
      return Promise.resolve(fee);
    }

    // existing fee
    const fee = await this.feeService.get(+id);
    return fee ? fee : Promise.reject();
  }
}
