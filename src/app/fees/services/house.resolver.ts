import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { House } from 'core/types/house';

@Injectable({
  providedIn: 'root'
})
export class HouseResolver implements Resolve<House> {
  constructor(private houseService: HouseService, private router: Router, private location: Location) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<House> {
    const houseUuid = route.paramMap.get('houseUuid')!;
    let house: House | null;

    if (houseUuid === 'new') {
      house = await this.houseService.save({});
    } else if (houseUuid !== 'current') {
      house = await this.houseService.get(houseUuid);
    } else {
      house = await this.houseService.getLastActive() || await this.houseService.save({});
    }

    if (!house) {
      return Promise.reject();
    }

    return this.houseService.save({...house, lastActiveAt: Date.now()})
      .then(house => {
        if (houseUuid !== house.uuid) {
          setTimeout(() => this.location.replaceState(`/fees/${house.uuid}`))
        }
        return house;
      });
  }
}
