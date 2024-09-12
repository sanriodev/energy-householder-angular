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
import { ApexOptions } from 'apexcharts';
import { DateTime } from 'luxon';

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
  WeatherData?: { x: DateTime; y: number }[];

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.WeatherService.getWeatherData().subscribe(
      (data: WeatherDataModel | undefined) => {
        if (data) {
          this.WeatherData = this.toChartData(data);
          this.drawChart();
        }
        return;
      }
    );
  }

  drawChart(force = false) {
    const values: { x: DateTime; y: number }[] = [];
    if (this.WeatherData)
      this.WeatherData.forEach((h: { x: DateTime; y: number }) => {
        values.unshift({ x: h.x, y: h.y });
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

  toChartData(data: WeatherDataModel): { x: DateTime; y: number }[] {
    const values: { x: DateTime; y: number }[] = [];
    data.hourly.time.forEach((h: string, i: number) => {
      const value = data.hourly.temperature_2m[i];
      const timestamp = DateTime.fromISO(h);
      values.unshift({ x: timestamp, y: value });
    });
    return values;
  }
}
