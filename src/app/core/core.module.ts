import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HouseImportComponent } from './components/house-import/house-import.component';
import { HousesMenuComponent } from './components/houses-menu/houses-menu.component';
import { MissingPageComponent } from './components/missing-page/missing-page.component';
import { DbClient } from './services/db-client';

@NgModule({
  declarations: [
    HouseImportComponent,
    HousesMenuComponent,
    MissingPageComponent,
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
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
