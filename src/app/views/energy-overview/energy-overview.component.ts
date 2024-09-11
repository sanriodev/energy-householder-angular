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
  ngOnInit(): void {
    this.energyService.getEnergyData().subscribe((data) => {
      this.energyData = data;
    });
  }
}
