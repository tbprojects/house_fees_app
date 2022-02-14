import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, TrackByFunction } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { HouseService } from 'core/services/house.service';
import { Fee } from 'core/types/fee';
import { House } from 'core/types/house';
import { concatMap, map, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.scss']
})
export class FeeListViewComponent implements OnInit, OnDestroy {
  private destroyed = new Subject<void>();
  private syncRequest = new Subject<void>();
  private smallColumns = ['typeSmall', 'periodSmall', 'quantity', 'value', 'actions'];
  private allColumns = ['type', 'period', 'quantity', 'value', 'rate', 'actions'];
  trackByFn: TrackByFunction<Fee> = (index, fee: Fee) => fee.uuid;

  house = this.route.parent!.data
    .pipe(
      map(data => data['house'] as House)
    );

  houseName = this.house.pipe(
    map(house => house.name)
  );

  fees = this.house
    .pipe(
      switchMap(house => this.feeService.getAll(house.uuid!))
    );

  smallScreen = this.breakpoint
    .observe([Breakpoints.XSmall])
    .pipe(
      takeUntil(this.destroyed),
      map(result => {
        return result.matches
      })
    );

  columns = this.smallScreen
    .pipe(
      map(smallScreen => smallScreen ? this.smallColumns : this.allColumns )
    );

  columnsCount = this.columns
    .pipe(
      map(columns => columns.length)
    );

  feeTypeLabelSize = this.smallScreen
    .pipe(
      map(smallScreen => smallScreen ? 'short' : 'regular' )
    );

  get houseUuid(): string {
    return this.route.snapshot.data['house'].uuid;
  }

  constructor(
    private feeService: FeeService,
    private houseService: HouseService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private breakpoint: BreakpointObserver
  ) {}

  ngOnInit() {
    this.setupSync();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  sync() {
    this.syncRequest.next();
  }

  private setupSync() {
    this.syncRequest.pipe(
      takeUntil(this.destroyed),
      concatMap(() => this.houseService.sync(this.houseUuid)),
    ).subscribe((synced) => {
      if (!synced) {
        this.snackBar.open($localize `Sync failed!`);
      }
    })
  }
}
