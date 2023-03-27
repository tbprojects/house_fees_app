import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, DefaultDataPoint } from 'chart.js';
import { Fee } from 'core/types/fee';
import { FeeMappers } from '../../services/fee.mappers';

@Component({
  selector: 'app-fee-chart',
  templateUrl: './fee-chart.component.html',
  styleUrls: ['./fee-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeeChartComponent implements OnChanges {
  @Input() fees: Fee[] = [];
  configuration!: ChartConfiguration<'bar', DefaultDataPoint<'bar'>, string>;

  constructor(private feeMappers: FeeMappers) {}

  ngOnChanges(): void {
    this.configuration = this.feeMappers.feesToChart(this.fees);
  }
}
