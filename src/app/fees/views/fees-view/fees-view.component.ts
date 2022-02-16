import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { SyncService } from 'core/services/sync.service';
import { House } from 'core/types/house';
import { SyncStatus } from 'core/types/sync-status';
import { delay, distinctUntilKeyChanged, filter, map, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fees-view',
  templateUrl: './fees-view.component.html',
  styleUrls: ['./fees-view.component.scss']
})
export class FeesViewComponent implements OnInit {
  private destroyed = new Subject<void>();

  house = this.route.data
    .pipe(
      map(data => data['house'] as House)
    );

  fees = this.house
    .pipe(
      distinctUntilKeyChanged('uuid'),
      switchMap(house => this.feeService.getAll(house.uuid!))
    );

  constructor(private feeService: FeeService,
              private syncService: SyncService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.setupSync();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  private setupSync() {
    this.syncService.syncStatus.pipe(
      takeUntil(this.destroyed),
      filter(status => status === SyncStatus.Error),
      delay(3_000),
    ).subscribe(() => this.snackBar.open($localize `Sync failed!`))

    this.house.pipe(
      takeUntil(this.destroyed),
      distinctUntilKeyChanged('uuid'),
    ).subscribe((house) => this.syncService.requestSync(house.uuid!))
  }
}
