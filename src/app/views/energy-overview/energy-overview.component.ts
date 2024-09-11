import { Component, Inject, OnInit } from '@angular/core';
import { EnergyDataService } from '../../services/energy-data.service';

@Component({
  selector: 'app-energy-overview',
  templateUrl: './energy-overview.component.html',
  styleUrls: ['./energy-overview.component.scss'],
})
export class EnergyOverviewComponent implements OnInit {
  constructor(
    @Inject(EnergyDataService) private readonly energyService: EnergyDataService
  ) {}
  energyData: any;
  mockData = [
    {
      batteryLevel: 50,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(),
    },
  ];
  ngOnInit(): void {
    this.energyService.getEnergyData().subscribe((data) => {
      this.energyData = data;
    });
  }
}
