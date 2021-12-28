import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsFormControlPipe } from './pipes/as-form-control.pipe';

@NgModule({
  declarations: [
    AsFormControlPipe
  ],
  exports: [
    AsFormControlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
