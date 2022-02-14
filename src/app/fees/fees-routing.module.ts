import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeResolver } from './services/fee.resolver';
import { HouseResolver } from './services/house.resolver';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';
import { HouseCurrentViewComponent } from './views/house-current-view/house-current-view.component';
import { HouseFormViewComponent } from './views/house-form-view/house-form-view.component';
import { HouseManageViewComponent } from './views/house-manage-view/house-manage-view.component';
import { HouseNewViewComponent } from './views/house-new-view/house-new-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HouseCurrentViewComponent
  },
  {
    path: 'new',
    component: HouseNewViewComponent
  },
  {
    path: 'manage/:houseUuid',
    component: HouseManageViewComponent
  },
  {
    path: ':houseUuid',
    component: FeesViewComponent,
    resolve: {house: HouseResolver},
    children: [
      {
        path: '',
        component: FeeListViewComponent
      },
      {
        path: 'edit',
        component: HouseFormViewComponent
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
