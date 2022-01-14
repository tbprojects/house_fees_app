import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, TrackByFunction } from '@angular/core';
import { Fee } from 'core/types/fee';
import { map, Subject, takeUntil } from 'rxjs';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'app-fee-list-view',
  templateUrl: './fee-list-view.component.html',
  styleUrls: ['./fee-list-view.component.scss']
})
export class FeeListViewComponent implements OnDestroy {
  private destroyed = new Subject<void>();
  private smallColumns = ['typeSmall', 'periodSmall', 'quantity', 'value', 'actions'];
  private allColumns = ['type', 'period', 'quantity', 'value', 'rate', 'actions'];
  trackByFn: TrackByFunction<Fee> = (index, fee: Fee) => fee.id;

  fees = this.feeService.getAll();

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

  feeTypeLabelSize = this.smallScreen
    .pipe(
      map(smallScreen => smallScreen ? 'short' : 'regular' )
    );

  constructor(private feeService: FeeService, private breakpoint: BreakpointObserver) {}

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
