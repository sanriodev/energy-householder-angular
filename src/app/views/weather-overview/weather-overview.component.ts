import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { WeatherDataModel } from '../../models/weather-data.model';
import { WeatherDataService } from '../../services/weather-data.service';

@Component({
  selector: 'app-weather-overview',
  templateUrl: './weather-overview.component.html',
  styleUrls: ['./weather-overview.component.scss'],
})
export class WeatherOverviewComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(WeatherDataService)
    private readonly WeatherService: WeatherDataService
  ) {}
  @ViewChild('batteryChart') chart?: ElementRef<HTMLDivElement>;
  WeatherData: WeatherDataModel | undefined;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.WeatherService.getWeatherData().subscribe((data) => {
      this.WeatherData = data;
      // this.drawChart();
    });
  }

  // drawChart(force = false) {
  //   const values: { x: number; y: number }[] = [];
  //   if (this.WeatherData)
  //     this.WeatherData.hourly.forEach((h: any) => {
  //       const value = h.batteryLevel;
  //       const timestamp = new Date(h.occuredAt).getTime();
  //       values.unshift({ x: timestamp, y: value });
  //     });
  //   const options: ApexOptions = {
  //     series: [
  //       {
  //         name: 'Ladestatus in %',
  //         data: values,
  //       },
  //     ],
  //     chart: {
  //       id: 'area-datetime',
  //       type: 'area',
  //       height: 400,
  //       zoom: {
  //         enabled: true,
  //       },
  //       animations: {
  //         enabled: false,
  //       },
  //     },
  //     stroke: {
  //       curve: 'smooth',
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     xaxis: {
  //       type: 'datetime',
  //       labels: {
  //         datetimeUTC: false,
  //       },
  //     },
  //     yaxis: {
  //       min: 0,
  //       max: 100,
  //     },
  //     tooltip: {
  //       x: {
  //         format: 'dd MMM yyyy, HH mm',
  //       },
  //     },
  //     fill: {
  //       type: 'gradient',
  //       gradient: {
  //         shadeIntensity: 1,
  //         opacityFrom: 0.7,
  //         opacityTo: 0.9,
  //         stops: [0, 100],
  //       },
  //     },
  //     colors: ['#4DBD74'],
  //   };
  //   new ApexCharts(this.chart?.nativeElement, options).render();
  // }
}
