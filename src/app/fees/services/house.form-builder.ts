import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable()
export class HouseFormBuilder {
  buildForm(): UntypedFormGroup {
    return new UntypedFormGroup({
      uuid: new UntypedFormControl(null),
      name: new UntypedFormControl(null)
    })
  }
}
