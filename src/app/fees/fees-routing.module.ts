import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeResolver } from './services/fee.resolver';
import { HouseResolver } from './services/house.resolver';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';
import { HouseCurrentViewComponent } from './views/house-current-view/house-current-view.component';
import { HouseEnableShareViewComponent } from './views/house-enable-share-view/house-enable-share-view.component';
import { HouseEnableShareViewGuard } from './views/house-enable-share-view/house-enable-share-view.guard';
import { HouseFormViewComponent } from './views/house-form-view/house-form-view.component';
import { HouseNewViewComponent } from './views/house-new-view/house-new-view.component';
import { HouseShareViewComponent } from './views/house-share-view/house-share-view.component';
import { HouseShareViewGuard } from './views/house-share-view/house-share-view.guard';

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
    path: ':houseUuid',
    component: FeesViewComponent,
    resolve: {house: HouseResolver},
    runGuardsAndResolvers: 'always',
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
        path: 'share-enable',
        component: HouseEnableShareViewComponent,
        canActivate: [HouseEnableShareViewGuard]
      },
      {
        path: 'share',
        component: HouseShareViewComponent,
        canActivate: [HouseShareViewGuard]
      },
      {
        path: ':feeUuid',
        component: FeeFormViewComponent,
        resolve: {fee: FeeResolver}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
