import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HousesMenuComponent } from './comoponents/houses-menu/houses-menu.component';
import { HouseNamePipe } from './pipes/house-name.pipe';

@NgModule({
  declarations: [
    HouseNamePipe,
    HousesMenuComponent
  ],
  exports: [
    HouseNamePipe,
    HousesMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ]
})
export class HousesModule { }
