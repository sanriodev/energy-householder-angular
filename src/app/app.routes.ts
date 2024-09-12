import { Routes } from '@angular/router';
import { EnergyOverviewComponent } from './views/energy-overview/energy-overview.component';
import { HeartbeatOverviewComponent } from './views/heartbeat-overview/heartbeat-overview.component';
import { WeatherOverviewComponent } from './views/weather-overview/weather-overview.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: EnergyOverviewComponent,
  },
  {
    path: 'heartbeats',
    component: HeartbeatOverviewComponent,
  },
  {
    path: 'weather',
    component: WeatherOverviewComponent,
  },
];
