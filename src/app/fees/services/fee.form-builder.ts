import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { feeConfig } from '../data/fee-config';

@Injectable()
export class FeeFormBuilder implements OnDestroy {
  private destroy = new Subject<void>();

  buildForm(): FormGroup {
    const form = new FormGroup({
      id: new FormControl(null),
      type: new FormControl(null, {validators: [Validators.required]}),
      quantity: new FormControl(0, {validators: [Validators.required, Validators.min(1)]}),
      unit: new FormControl(null, {validators: [Validators.required]}),
      startAt: new FormControl(null, {validators: [Validators.required]}),
      endAt: new FormControl(null, {validators: [Validators.required]}),
      value: new FormControl(null, {validators: [Validators.required, Validators.min(0.01)]}),
    });

    form.get('type')!.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(type => form.get('unit')!.setValue(feeConfig.get(type)?.unit ?? ''))

    return form;
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
