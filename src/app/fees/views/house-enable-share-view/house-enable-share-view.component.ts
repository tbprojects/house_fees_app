import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { House } from 'core/types/house';
import { map } from 'rxjs';

@Component({
  selector: 'app-house-enable-share-view',
  templateUrl: './house-enable-share-view.component.html',
  styleUrls: ['./house-enable-share-view.component.scss']
})
export class HouseEnableShareViewComponent {
  house = this.route.parent!.data
    .pipe(
      map(data => data['house'] as House)
    );

  get houseUuid(): string {
    return this.route.snapshot.parent!.data['house'].uuid;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private houseService: HouseService,
    private snackBar: MatSnackBar
  ) { }

  async enableSharing() {
    await this.houseService.enableSync(this.houseUuid);
    this.snackBar.open($localize `Sharing enabled!`);
    this.router.navigate(['..', 'share'], {relativeTo: this.route});
  }
}
