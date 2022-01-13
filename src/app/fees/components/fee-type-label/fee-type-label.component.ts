import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { FeeType } from 'core/types/fee-type';
import { feeConfig } from '../../data/fee-config';

@Component({
  template: '',
  selector: 'app-fee-type-label',
  styleUrls: ['./fee-type-label.component.scss']
})
export class FeeTypeLabelComponent implements OnChanges {
  @Input() type!: FeeType;

  @HostBinding('style.background-color')
  color: string = '';

  @HostBinding('textContent')
  label: string = '';

  ngOnChanges() {
    const {label, color} = feeConfig.get(this.type)!;
    this.label = label;
    this.color = color;
  }
}
