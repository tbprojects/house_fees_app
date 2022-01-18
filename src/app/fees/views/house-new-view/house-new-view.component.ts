import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';

@Component({
  selector: 'app-house-new-view',
  template: ``,
})
export class HouseNewViewComponent implements OnInit {

  constructor(
    private houseService: HouseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  private async redirect() {
    const house = await this.houseService.save({});
    this.router.navigate(['..', house.uuid], {relativeTo: this.route, replaceUrl: true});
  }

}
