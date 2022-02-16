import { Component, Input } from '@angular/core';
import { FeeType } from 'core/types/fee-type';
import { FeeConfig, feeConfig } from '../../data/fee-config';

@Component({
  template: `
    <mat-icon [style.color]="config.color">{{config.icon}}</mat-icon>
    <ng-container *ngIf="size === 'regular'">{{config.label}}</ng-container>
  `,
  selector: 'app-fee-type-label',
  styleUrls: ['./fee-type-label.component.scss']
})
export class FeeTypeLabelComponent {
  @Input() size: null | 'short' | 'regular' = 'regular';
  @Input() set type(type: FeeType) {
    this.config = feeConfig.get(type)!;
  };
  config!: FeeConfig;
}
