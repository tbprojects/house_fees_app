import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { Fee } from 'core/types/fee';

@Injectable({
  providedIn: 'root'
})
export class FeeResolver implements Resolve<Fee> {
  constructor(private feeService: FeeService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Fee> {
    const feeUuid = route.paramMap.get('feeUuid')!;
    const houseUuid = route.parent!.data['house'].uuid;
    let fee: Fee | null;

    if (feeUuid === 'new') {
      fee = {houseUuid, endAt: '', startAt: '', type: null, unit: '', value: 0, quantity: 1};
    } else {
      fee = await this.feeService.get(feeUuid);
    }

    if (!fee) {
      return Promise.reject();
    }

    return fee;
  }
}
