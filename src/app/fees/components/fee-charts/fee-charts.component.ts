import { Component, Input, OnChanges } from '@angular/core';
import { Fee } from 'core/types/fee';
import { FeeMappers, MonthChart } from '../../services/fee.mappers';

@Component({
  selector: 'app-fee-charts',
  templateUrl: './fee-charts.component.html',
  styleUrls: ['./fee-charts.component.scss']
})
export class FeeChartsComponent implements OnChanges {
  @Input() fees: Fee[] = [];
  chartMap: Map<number, MonthChart> = new Map();
  years: number[] = [];

  constructor(private feeMappers: FeeMappers) {}

  ngOnChanges() {
    this.chartMap = this.feeMappers.feesToChartMap(this.fees);
    this.years = Array.from(this.chartMap.keys());
  }
}
