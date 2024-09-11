import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EnergyDataService } from '../../services/energy-data.service';
import ApexCharts, { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-energy-overview',
  templateUrl: './energy-overview.component.html',
  styleUrls: ['./energy-overview.component.scss'],
})
export class EnergyOverviewComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(EnergyDataService) private readonly energyService: EnergyDataService
  ) {}
  @ViewChild('batteryChart') chart?: ElementRef<HTMLDivElement>;
  energyData: any;
  mockDate = new Date();
  /*   mockData = [
    {
      batteryLevel: 10,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(
        this.mockDate.setHours(this.mockDate.getHours() - 10)
      ),
    },
    {
      batteryLevel: 15,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 9)),
    },
    {
      batteryLevel: 33,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 8)),
    },
    {
      batteryLevel: 25,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 7)),
    },
    {
      batteryLevel: 50,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 6)),
    },
    {
      batteryLevel: 64,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 5)),
    },
    {
      batteryLevel: 80,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 4)),
    },
    {
      batteryLevel: 100,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 3)),
    },
    {
      batteryLevel: 78,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 2)),
    },
    {
      batteryLevel: 54,
      batteryPercent: '50%',
      batteryStatus: 'Charging',
      batteryVoltage: '12.5',
      occuredAt: new Date(this.mockDate.setHours(this.mockDate.getHours() - 1)),
    },
  ]; */
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.energyService.getEnergyData().subscribe((data) => {
      this.energyData = data;
      this.drawChart();
    });
  }

  drawChart(force = false) {
    // if (!this.mockData) return;
    // if (this.chart?.nativeElement.hasChildNodes()) {
    //   if (force) this.chart.nativeElement.innerHTML = '';
    //   else return;
    // }
    const values: { x: number; y: number }[] = [];
    if (this.energyData)
      this.energyData.forEach((h: any) => {
        const value = h.batteryLevel;
        const timestamp = new Date(h.occuredAt).getTime();
        values.unshift({ x: timestamp, y: value });
      });
    const options: ApexOptions = {
      series: [
        {
          name: 'Ladestatus in %',
          data: values,
        },
      ],
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 400,
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy, HH mm',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      colors: ['#4DBD74'],
    };
    new ApexCharts(this.chart?.nativeElement, options).render();
  }
}
