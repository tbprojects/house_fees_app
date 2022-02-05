import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FeeChartComponent } from './components/fee-chart/fee-chart.component';
import { FeeTypeLabelComponent } from './components/fee-type-label/fee-type-label.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeRatePipe } from './pipes/fee-rate.pipe';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';
import { HouseCurrentViewComponent } from './views/house-current-view/house-current-view.component';
import { HouseFormViewComponent } from './views/house-form-view/house-form-view.component';
import { HouseNewViewComponent } from './views/house-new-view/house-new-view.component';

@NgModule({
  declarations: [
    FeesViewComponent,
    FeeFormViewComponent,
    FeeChartComponent,
    FeeRatePipe,
    FeeTypeLabelComponent,
    FeeListViewComponent,
    HouseFormViewComponent,
    HouseCurrentViewComponent,
    HouseNewViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FeesRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule
  ]
})
export class FeesModule { }
