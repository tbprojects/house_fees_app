import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
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
  labels: string[] = []
  type: ChartType = 'line';
  datasets: ChartDataset[] = [];
  options: ChartOptions = {};

  constructor(private feeMappers: FeeMappers) {
  }

  ngOnChanges(): void {
    const {type, labels, datasets, options} = this.feeMappers.feesToChart(this.fees);
    this.type = type;
    this.labels = labels;
    this.datasets = datasets;
    this.options = options;
  }
}
