import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherOverviewComponent } from './weather-overview.component';
import { WeatherDataService } from '../../services/weather-data.service';

@NgModule({
  declarations: [WeatherOverviewComponent],
  imports: [CommonModule],
  providers: [WeatherDataService],
  bootstrap: [WeatherOverviewComponent],
})
export class WeatherOverviewModule {}
