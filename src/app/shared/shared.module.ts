import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ConfirmSnackbarComponent } from './components/confirm-snackbar/confirm-snackbar.component';
import { AsFormControlPipe } from './pipes/as-form-control.pipe';
import { HouseNamePipe } from './pipes/house-name.pipe';

@NgModule({
  declarations: [
    AsFormControlPipe,
    HouseNamePipe,
    ConfirmSnackbarComponent
  ],
  exports: [
    AsFormControlPipe,
    HouseNamePipe,
    ConfirmSnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class SharedModule { }
