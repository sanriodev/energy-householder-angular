import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnergyOverviewComponent } from './energy-overview.component';
import { EnergyDataService } from '../../services/energy-data.service';

@NgModule({
  declarations: [EnergyOverviewComponent],
  imports: [CommonModule],
  providers: [EnergyDataService],
  bootstrap: [EnergyOverviewComponent],
})
export class EnergyOverviewModule {}
