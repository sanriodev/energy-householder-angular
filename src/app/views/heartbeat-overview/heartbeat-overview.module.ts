import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnergyDataService } from '../../services/energy-data.service';
import { HeartbeatOverviewComponent } from './heartbeat-overview.component';

@NgModule({
  declarations: [HeartbeatOverviewComponent],
  imports: [CommonModule],
  providers: [EnergyDataService],
  bootstrap: [HeartbeatOverviewComponent],
})
export class HeartbeatOverviewModule {}
