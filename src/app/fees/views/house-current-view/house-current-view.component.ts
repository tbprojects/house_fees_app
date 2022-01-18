import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';

@Component({
  selector: 'app-house-current-view',
  template: ``,
})
export class HouseCurrentViewComponent implements OnInit {
  constructor(
    private houseService: HouseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  private async redirect() {
    const house = await this.houseService.getLastActive() || await this.houseService.save({});
    this.router.navigate([house.uuid], {relativeTo: this.route, replaceUrl: true});
  }
}
