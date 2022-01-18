import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { House } from 'core/types/house';

@Injectable({
  providedIn: 'root'
})
export class HouseResolver implements Resolve<House> {
  constructor(private houseService: HouseService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<House> {
    const houseUuid = route.paramMap.get('houseUuid')!;
    const house: House | null = await this.houseService.get(houseUuid);

    if (!house) {
      return Promise.reject();
    }

    return this.houseService.save({...house, lastActiveAt: Date.now()})
  }
}
