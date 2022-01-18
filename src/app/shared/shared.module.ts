import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ConfirmSnackbarComponent } from './components/confirm-snackbar/confirm-snackbar.component';
import { AsFormControlPipe } from './pipes/as-form-control.pipe';

@NgModule({
  declarations: [
    AsFormControlPipe,
    ConfirmSnackbarComponent
  ],
  exports: [
    AsFormControlPipe,
    ConfirmSnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class SharedModule { }
