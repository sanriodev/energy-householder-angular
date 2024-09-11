import { RouterModule, Routes } from '@angular/router';
import { EnergyOverviewComponent } from './views/energy-overview/energy-overview.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'energy-overview',
    children: [
      {
        path: 'energy-overview',
        component: EnergyOverviewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
