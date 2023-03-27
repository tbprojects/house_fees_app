import { Injectable, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { feeConfig } from '../data/fee-config';

@Injectable()
export class FeeFormBuilder implements OnDestroy {
  private destroy = new Subject<void>();

  buildForm(): UntypedFormGroup {
    const form = new UntypedFormGroup({
      uuid: new UntypedFormControl(null),
      houseUuid: new UntypedFormControl(null, {validators: [Validators.required]}),
      type: new UntypedFormControl(null, {validators: [Validators.required]}),
      quantity: new UntypedFormControl(0, {validators: [Validators.required, Validators.min(1)]}),
      unit: new UntypedFormControl(null, {validators: [Validators.required]}),
      startAt: new UntypedFormControl(null, {validators: [Validators.required]}),
      endAt: new UntypedFormControl(null, {validators: [Validators.required]}),
      value: new UntypedFormControl(null, {validators: [Validators.required, Validators.min(0.01)]}),
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
