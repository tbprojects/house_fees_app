import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeResolver } from './services/fee.resolver';
import { HouseResolver } from './services/house.resolver';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'current',
  },
  {
    path: ':houseUuid',
    component: FeesViewComponent,
    resolve: {house: HouseResolver},
    runGuardsAndResolvers: 'pathParamsChange',
    children: [
      {
        path: '',
        component: FeeListViewComponent
      },
      {
        path: ':feeUuid',
        component: FeeFormViewComponent,
        resolve: {fee: FeeResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
