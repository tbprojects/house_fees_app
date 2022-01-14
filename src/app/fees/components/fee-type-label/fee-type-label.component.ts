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
  @Input() size: null | 'short' | 'regular' = 'regular';

  @HostBinding('style.background-color')
  color: string = '';

  @HostBinding('textContent')
  label: string = '';

  ngOnChanges() {
    const {label, color} = feeConfig.get(this.type)!;
    this.label = this.size === 'short' ? label[0] : label;
    this.color = color;
  }
}
