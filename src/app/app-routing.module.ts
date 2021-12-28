import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'fees',
    loadChildren: () => import('./fees/fees.module').then(m => m.FeesModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
