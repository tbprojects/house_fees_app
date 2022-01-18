import { Component } from '@angular/core';
import { HouseService } from 'core/services/house.service';

@Component({
  selector: 'app-houses-menu',
  templateUrl: './houses-menu.component.html',
  styleUrls: ['./houses-menu.component.scss']
})
export class HousesMenuComponent {
  houses = this.houseService.getAll();

  constructor(private houseService: HouseService) {}
}
