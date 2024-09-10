import { Component, Inject, OnInit } from '@angular/core';
import { EnergyDataService } from './service/energy-data.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './service/module/services.module';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ServicesModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class EnergyDataComponent implements OnInit {
  constructor(
    @Inject(EnergyDataService) private readonly energyService: EnergyDataService
  ) {}
  energyData: any;
  ngOnInit(): void {
    this.energyService.getEnergyData().subscribe((data) => {
      this.energyData = data;
    });
  }
}
