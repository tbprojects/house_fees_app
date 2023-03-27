import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';

@Pipe({
  name: 'asFormControl'
})
export class AsFormControlPipe implements PipeTransform {

  transform(control: AbstractControl | null): UntypedFormControl {
    return control as UntypedFormControl;
  }

}
