import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HousesMenuComponent } from './components/houses-menu/houses-menu.component';
import { DbClient } from './services/db-client';

@NgModule({
  declarations: [
    HousesMenuComponent
  ],
  exports: [
    HousesMenuComponent
  ],
  providers: [
    DbClient
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ]
})
export class CoreModule { }
