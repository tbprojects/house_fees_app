import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissingPageComponent } from 'core/components/missing-page/missing-page.component';

const routes: Routes = [
  {
    path: 'fees',
    loadChildren: () => import('./fees/fees.module').then(m => m.FeesModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fees'
  },
  {
    path: '**',
    component: MissingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
