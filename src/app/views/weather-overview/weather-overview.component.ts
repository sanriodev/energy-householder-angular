import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WeatherDataModel } from '../../models/weather-data.model';
import { WeatherDataService } from '../../services/weather-data.service';
import ApexCharts, { ApexOptions } from 'apexcharts';

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
  @ViewChild('weatherChart') chart?: ElementRef<HTMLDivElement>;
  chartData?: { x: number; temp: number; rain: number }[];
  weatherData: WeatherDataModel | undefined;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.WeatherService.getWeatherData().subscribe(
      (data: WeatherDataModel | undefined) => {
        if (data) {
          this.chartData = this.toChartData(data);
          this.weatherData = data;
        }
        this.drawChart();
      }
    );
  }

  drawChart(force = false) {
    const tempvalues: { x: number; y: number }[] = [];
    const rainvalues: { x: number; y: number }[] = [];
    if (this.chartData)
      this.chartData.forEach((h: { x: number; temp: number; rain: number }) => {
        tempvalues.unshift({ x: h.x, y: h.temp });
        rainvalues.unshift({ x: h.x, y: h.rain });
      });
    const options: ApexOptions = {
      series: [
        {
          name: 'Temperatur in °C',
          data: tempvalues,
        },
        {
          name: 'Regen in mm',
          data: rainvalues,
          color: '#0088FF',
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
      yaxis: [
        {
          opposite: false,
          title: {
            text: 'Temperature in °C',
            rotate: -90,
          },
        },
        {
          opposite: true,
          title: {
            text: 'Regen in mm',
            rotate: -270,
          },
        },
      ],
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

  toChartData(
    data: WeatherDataModel
  ): { x: number; temp: number; rain: number }[] {
    const values: { x: number; temp: number; rain: number }[] = [];
    data.hourly.time.forEach((h: string, i: number) => {
      const temp = data.hourly.temperature_2m[i];
      const rain = data.hourly.rain[i];
      const timestamp = new Date(h).getTime();
      values.unshift({ x: timestamp, temp: temp, rain: rain });
    });
    return values;
  }
}
