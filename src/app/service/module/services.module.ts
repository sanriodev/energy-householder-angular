import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnergyDataService } from '../energy-data.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [EnergyDataService],
  exports: [],
})
export class ServicesModule {}
