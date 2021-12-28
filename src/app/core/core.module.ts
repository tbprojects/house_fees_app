import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DbClient } from './services/db-client';

@NgModule({
  providers: [
    DbClient
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
