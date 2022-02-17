import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { SyncService } from 'core/services/sync.service';
import { House } from 'core/types/house';

@Injectable({
  providedIn: 'root'
})
export class HouseResolver implements Resolve<House> {
  constructor(private houseService: HouseService, private syncService: SyncService, private router: Router) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<House> {
    const uuid = route.paramMap.get('houseUuid')!;
    const house: House | null = await this.getHouse(uuid);

    if (!house) {
      this.router.navigate(['404']);
      return Promise.reject();
    }

    await this.houseService.updateLastActiveAt(house.uuid!);

    return house;
  }

  private async getHouse(uuid: string): Promise<House | null> {
    // Use local house
    let house = await this.houseService.get(uuid);
    if (house) {
      return house;
    }

    // Use remote house
    const exists = await this.syncService.checkIfExists(uuid);
    if (!exists) {
      return null;
    }

    await this.houseService.create({uuid, syncEnabled: true});
    await this.syncService.sync(uuid);
    return await this.houseService.get(uuid);
  }
}
