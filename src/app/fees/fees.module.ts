import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';
import { HousesModule } from '../houses/houses.module';
import { MaterialModule } from '../material/material.module';
import { FeeChartComponent } from './components/fee-chart/fee-chart.component';
import { FeeTypeLabelComponent } from './components/fee-type-label/fee-type-label.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeRatePipe } from './pipes/fee-rate.pipe';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';

@NgModule({
  declarations: [
    FeesViewComponent,
    FeeFormViewComponent,
    FeeChartComponent,
    FeeRatePipe,
    FeeTypeLabelComponent,
    FeeListViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HousesModule,
    FeesRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule
  ]
})
export class FeesModule { }
