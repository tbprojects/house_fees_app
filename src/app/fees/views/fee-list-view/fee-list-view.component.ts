import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, TrackByFunction } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { HouseService } from 'core/services/house.service';
import { Fee } from 'core/types/fee';
import { lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ConfirmSnackbarComponent } from 'shared/components/confirm-snackbar/confirm-snackbar.component';

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
      map(data => data['house'])
    );

  houseName = this.house.pipe(
    map(house => house.name)
  );

  fees = this.house
    .pipe(
      switchMap(house => this.feeService.getAll(house.uuid))
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

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  async remove() {
    const confirmRef = this.snackBar.openFromComponent(ConfirmSnackbarComponent, {duration: undefined})
    const result = await lastValueFrom(confirmRef.afterDismissed());

    if (result.dismissedByAction) {
      await this.houseService.remove(this.houseUuid);
      this.snackBar.open($localize `House removed!`);
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
}
