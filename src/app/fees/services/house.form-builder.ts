import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class HouseFormBuilder {
  buildForm(): FormGroup {
    return new FormGroup({
      uuid: new FormControl(null),
      name: new FormControl(null)
    })
  }
}
