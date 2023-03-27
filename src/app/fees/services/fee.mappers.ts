import { formatDate, formatNumber } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartOptions, DefaultDataPoint } from 'chart.js';
import { Fee } from 'core/types/fee';
import { FeeType } from 'core/types/fee-type';
import {
  differenceInCalendarDays,
  eachMonthOfInterval,
  endOfDay,
  endOfMonth,
  endOfYear,
  getYear,
  startOfDay,
  startOfYear
} from 'date-fns';
import { feeConfig } from '../data/fee-config';

export type MonthChart = ChartConfiguration<'bar', DefaultDataPoint<'bar'>, string>;

@Injectable({providedIn: 'root'})
export class FeeMappers {
  private getOptions({min, max}: {min: number, max: number}): ChartOptions<'bar'> {
    return {
      responsive: true,
      animation: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          onHover: (e, legendItem, legend) => {
            const legendTooltip = document.querySelector('.legend-tooltip') as HTMLDivElement;
            const legendDataset = legend.chart.data.datasets[legendItem.datasetIndex] as
              (ChartDataset<"bar", number[]> & {quantities: number[], units: string[]});

            const sum = legendDataset.data.reduce((acc, value) => acc + value, 0);
            const formattedSum = formatNumber(sum, this.localeId, '1.2-2');

            const quantities = legendDataset.quantities.reduce((acc, quantity, index) => {
              const unit = legendDataset.units[index];
              return !quantity ? acc : {...acc, [unit]: ((acc[unit] ?? 0) + quantity)};
            }, {} as {[s: string]: number});
            const formattedQuantities = Object.entries(quantities)
              .map(([unit, quantity]) => `${formatNumber(quantity, this.localeId, '1.0-2')} ${unit}`).join(', ');

            const sumLabel = $localize`Year sum`;
            const valueLabel = `• ${$localize`Value`}: ${formattedSum}`;
            const quantityLabel = `• ${$localize`Quantity`}: ${formattedQuantities}`
            legendTooltip.innerHTML = `<strong>${sumLabel}:</strong><br>${valueLabel}<br>${quantityLabel}`;
            legendTooltip.style.left = `${e.x}px`;
            legendTooltip.style.top = `${e.y}px`;
            legendTooltip.style.display = 'block';
          },
          onLeave() {
            const legendTooltip = document.querySelector('.legend-tooltip') as HTMLDivElement;
            legendTooltip.style.display = 'none';
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              const value = tooltipItem.dataset.data[tooltipItem.dataIndex];
              const quantity = tooltipItem.dataset.quantities[tooltipItem.dataIndex];
              const unit = tooltipItem.dataset.units[tooltipItem.dataIndex];
              const heading = tooltipItem.dataset.label;
              const valueLabel = `• ${$localize`Value`}: ${formatNumber(value, this.localeId, '1.2-2')}`;
              const quantityLabel = `• ${$localize`Quantity`}: ${formatNumber(quantity, this.localeId, '1.0-2')} ${unit}`
              const noQuantityLabel = `• ${$localize`Quantity`}: ${$localize`unmeasurable`}`
              return [
                heading,
                valueLabel,
                unit === '' ? noQuantityLabel : quantityLabel
              ];
            },
            afterTitle: ([tooltipItem]: any[]) => {
              const sum = Object.entries(tooltipItem.parsed._stacks.y)
                .reduce((acc, [index, value]) => {
                  return isNaN(+index) ? acc : acc + (value as number);
                }, 0)
              const formattedValue = formatNumber(sum, this.localeId, '1.2-2');
              const totalLabel = $localize`Month sum`;
              return `${totalLabel}: ${formattedValue}`;
            }
          }
        },
      },
      scales: {
        x: {stacked: true, title: {display: false, text: $localize`Month`}},
        y: {suggestedMin: min, suggestedMax: max, stacked: true, title: {display: true, text: $localize`Value`}}
      }
    }
  }

  constructor(@Inject(LOCALE_ID) private localeId: string) {
  }

  feesToChartMap(fees: Fee[]): Map<number, MonthChart> {
    const chartMap = new Map<number, MonthChart>();

    // return empty config when there are no fees
    if (fees.length === 0) {
      return chartMap;
    }

    // discover boundary dates
    const start: number = Math.min(...fees.map(fee => startOfYear(new Date(fee.startAt)).getTime()));
    const end: number = Math.max(...fees.map(fee => endOfYear(new Date(fee.endAt)).getTime()));

    // discover used fee types
    const types = new Set<FeeType>(fees.map(fee => fee.type!));

    // setup sums grouped by month start date
    const sums = new Map<number, {[feeType: string]: {value: number, quantity: number, unit: string}}>(
      eachMonthOfInterval({start, end}).map(monthStartDate => [monthStartDate.getTime(), {}])
    );

    fees.forEach(fee => {
      // calculate fee length in days
      const feeStart = startOfDay(new Date(fee.startAt)).getTime();
      const feeEnd = endOfDay(new Date(fee.endAt)).getTime();
      const feeDays = differenceInCalendarDays(feeEnd, feeStart) + 1;

      // calculate fee values per months
      eachMonthOfInterval({start: feeStart, end: feeEnd}).forEach(monthStartDate => {
        const monthStart = monthStartDate.getTime();
        const monthEnd = endOfMonth(monthStart).getTime();
        const feeMonthDays = differenceInCalendarDays(Math.min(feeEnd, monthEnd), Math.max(feeStart, monthStart)) + 1;
        const monthSums = sums.get(monthStart)![fee.type!] ??= {value: 0, quantity: 0, unit: fee.unit};
        monthSums.value += fee.value * feeMonthDays / feeDays;
        monthSums.quantity += fee.quantity * feeMonthDays / feeDays;
        if (fee.unit !== monthSums.unit) {
          monthSums.unit = '';
        }
      });
    });

    // discover min max
    const min = 0;
    const max = Math.max(...Array.from(sums.values())
      .map(sum => Object.values(sum).reduce((acc, {value}) => acc + value, 0)));

    // spawn charts
    new Set(Array.from(sums.keys()).map((startAt) => getYear(startAt))).forEach((year) => {
      chartMap.set(year, {data: {labels: [], datasets: []}, type: 'bar', options: this.getOptions({min, max})});
    });

    // make charts
    Array.from(chartMap.entries()).forEach(([year, chart]) => {
      const filterFn = ([startAt]: [number, unknown]) => getYear(startAt) === year;

      // prepare labels by months
      const labels: string[] = Array.from(sums.entries())
        .filter(filterFn)
        .map(([startAt]) => formatDate(startAt, 'MMM', this.localeId));

      // prepare datasets per fee type
      const datasets: ChartDataset<'bar'>[] = Array.from(types).map(type => {
        const fill = 'origin';
        const borderColor = feeConfig.get(type)!.color;
        const hoverBackgroundColor = borderColor;
        const backgroundColor = `${borderColor}88`
        const label = feeConfig.get(type)!.label;
        const data = Array.from(sums.entries())
          .filter(filterFn)
          .map(([_, sum]) => sum[type]?.value ?? 0);
        const quantities = Array.from(sums.entries())
          .filter(filterFn)
          .map(([_, sum]) => sum[type]?.quantity ?? 0);
        const units = Array.from(sums.entries())
          .filter(filterFn)
          .map(([_, sum]) => sum[type]?.unit ?? '');

        return {label, fill, data, quantities, units, borderColor, backgroundColor, hoverBackgroundColor};
      });

      chart.data = {labels, datasets};
    });

    return chartMap;
  }
}
