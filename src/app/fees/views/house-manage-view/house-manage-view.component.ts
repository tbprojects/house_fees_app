import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { SyncService } from 'core/services/sync.service';

@Component({
  selector: 'app-house-manage-view',
  template: ``
})
export class HouseManageViewComponent implements OnInit {

  constructor(
    private houseService: HouseService,
    private syncService: SyncService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  private async redirect() {
    const uuid = this.route.snapshot.paramMap.get('houseUuid')!;
    let house = await this.houseService.get(uuid);
    if (!house) {
      await this.houseService.create({uuid, syncEnabled: true});
      await this.syncService.sync(uuid);
      this.snackBar.open($localize `Synchronization completed!`);
    }
    this.router.navigate(['../..', uuid], {relativeTo: this.route, replaceUrl: true});
  }

}
