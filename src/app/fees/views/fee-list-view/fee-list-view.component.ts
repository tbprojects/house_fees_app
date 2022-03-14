import { Component, OnDestroy, TrackByFunction } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { HouseService } from 'core/services/house.service';
import { ScreenSizeService } from 'core/services/screen-size.service';
import { Fee } from 'core/types/fee';
import { House } from 'core/types/house';
import { distinctUntilKeyChanged, map, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.scss']
})
export class FeeListViewComponent implements OnDestroy {
  private destroyed = new Subject<void>();
  private smallColumns = ['typeSmall', 'periodSmall', 'quantity', 'value', 'actions'];
  private allColumns = ['type', 'period', 'quantity', 'value', 'rate', 'actions'];
  trackByFn: TrackByFunction<Fee> = (index, fee: Fee) => fee.uuid;

  house = this.route.parent!.data
    .pipe(
      map(data => data['house'] as House)
    );

  fees = this.house
    .pipe(
      distinctUntilKeyChanged('uuid'),
      switchMap(house => this.feeService.getAll(house.uuid!))
    );

  smallScreen = this.screenSize.smallScreen
    .pipe(
      takeUntil(this.destroyed),
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
    return this.route.snapshot.parent!.data['house'].uuid;
  }

  constructor(
    private feeService: FeeService,
    private houseService: HouseService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private screenSize: ScreenSizeService
  ) {}

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
