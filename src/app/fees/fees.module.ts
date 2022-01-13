import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FeeChartComponent } from './components/fee-chart/fee-chart.component';
import { FeeListComponent } from './components/fee-list/fee-list.component';
import { FeesRoutingModule } from './fees-routing.module';
import { FeeRatePipe } from './pipes/fee-rate.pipe';
import { FeeTypeNamePipe } from './pipes/fee-type-name.pipe';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';

@NgModule({
  declarations: [
    FeesViewComponent,
    FeeFormViewComponent,
    FeeListComponent,
    FeeTypeNamePipe,
    FeeChartComponent,
    FeeRatePipe
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
