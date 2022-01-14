import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeeResolver } from './services/fee.resolver';
import { FeeFormViewComponent } from './views/fee-form-view/fee-form-view.component';
import { FeeListViewComponent } from './views/fee-list-view/fee-list-view.component';
import { FeesViewComponent } from './views/fees-view/fees-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeesViewComponent,
    children: [
      {
        path: '',
        component: FeeListViewComponent
      },
      {
        path: ':id',
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
