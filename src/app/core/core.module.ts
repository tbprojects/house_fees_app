import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HousesMenuComponent } from './components/houses-menu/houses-menu.component';
import { MissingPageComponent } from './components/missing-page/missing-page.component';
import { DbClient } from './services/db-client';

@NgModule({
  declarations: [
    HousesMenuComponent,
    MissingPageComponent
  ],
  exports: [
    HousesMenuComponent,
    MissingPageComponent
  ],
  providers: [
    DbClient
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    SharedModule
  ]
})
export class CoreModule { }
