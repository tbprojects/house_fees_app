import { formatDate, formatNumber } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Fee } from 'core/types/fee';
import { FeeType } from 'core/types/fee-type';
import { differenceInCalendarDays, eachMonthOfInterval, endOfDay, endOfMonth, startOfDay } from 'date-fns';
import { feeConfig } from '../data/fee-config';

@Injectable({providedIn: 'root'})
export class FeeMappers {
  private type: ChartType = 'bar';
  private options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${formatNumber(tooltipItem.raw, this.localeId, '1.2-2')}`;
          },
          footer: ([tooltipItem]: any[]) => {
            const sum = Object.entries(tooltipItem.parsed._stacks.y)
              .reduce((acc, [index, value]) => {
                return isNaN(+index) ? acc : acc + (value as number);
              }, 0)
            const formattedValue = formatNumber(sum, this.localeId, '1.2-2');
            const totalLabel = $localize `Month sum`;
            return `${totalLabel}: ${formattedValue}`;
          }
        }
      },
    },
    scales: {
      x: {stacked: true, title: {display: true, text: $localize `Month`}},
      y: {stacked: true, title: {display: true, text: $localize `Value`}}
    }
  }

  constructor(@Inject(LOCALE_ID) private localeId: string) {
  }

  feesToChart(fees: Fee[]): {type: ChartType, labels: string[], datasets: ChartDataset[], options: ChartOptions} {
    // return empty config when there are not fees
    if (fees.length === 0) {
      return {labels: [], datasets: [], type: this.type, options: this.options};
    }

    // discover boundary dates
    const start: number = Math.min(...fees.map(fee => new Date(fee.startAt).getTime()));
    const end: number = Math.max(...fees.map(fee => new Date(fee.endAt).getTime()));

    // discover used fee types
    const types = new Set<FeeType>(fees.map(fee => fee.type!));

    // setup sums grouped by month start date
    const sums = new Map<number, {[feeType: string]: number}>(
      eachMonthOfInterval({start, end}).map(weekStart => [weekStart.getTime(), {}])
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
        const feeMonthValue = fee.value * feeMonthDays / feeDays;
        const monthValue = sums.get(monthStart)![fee.type!] ?? 0;
        sums.get(monthStart)![fee.type!] = monthValue + feeMonthValue;
      });
    });

    // prepare labels by months
    const labels: string[] = Array.from(sums.keys()).map(date => formatDate(date, 'MM.y', this.localeId));

    // prepare datasets per fee type
    const datasets: ChartDataset[] = Array.from(types).map(type => {
      const fill = 'origin';
      const borderColor = feeConfig.get(type)!.color;
      const hoverBackgroundColor = borderColor;
      const backgroundColor = `${borderColor}88`
      const label = feeConfig.get(type)!.label;
      const data = Array.from(sums.values()).map(sum => sum[type] ?? 0);
      return {label, fill, data, borderColor, backgroundColor, hoverBackgroundColor};
    });

    return {labels, datasets, type: this.type, options: this.options};
  }
}
