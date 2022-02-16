import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HouseService } from 'core/services/house.service';

@Injectable({providedIn: 'root'})
export class HouseEnableShareViewGuard implements CanActivate {
  constructor(private router: Router, private houseService: HouseService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const uuid = route.parent!.params['houseUuid'];
    const house = await this.houseService.get(uuid);
    if (!house) { return false; }

    return house.syncEnabled ? this.router.createUrlTree([state.url.replace('share-enable', 'share')]) : true;
  }
}
