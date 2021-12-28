import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
import { Fee } from 'core/types/fee';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeeListComponent {
  @Input() fees: Fee[] = [];
  trackByFn: TrackByFunction<Fee> = (index, fee: Fee) => fee.id;

  columns = ['period', 'type', 'quantity', 'value', 'actions'];
}
