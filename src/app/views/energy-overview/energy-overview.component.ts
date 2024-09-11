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
import { ColumnDefinition, Tabulator } from 'tabulator-tables';
import { EnergyEntry } from '../../models/energy-entry.model';

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
  @ViewChild('tabulator') tabulatorViewChild?: ElementRef<HTMLDivElement>;
  energyData: EnergyEntry[] = [];
  table?: Tabulator;

  columnDefinitions: ColumnDefinition[] = [
    { title: 'Batterieladung', field: 'batteryPercent' },
    { title: 'Batteriespannung', field: 'batteryVoltage' },
    { title: 'Batterie Status', field: 'batteryStatus' },
    {
      title: 'Zeitpunkt',
      field: 'occuredAtFormatted',
    },
  ];
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.energyService.getEnergyData().subscribe((data) => {
      this.energyData = data;
      this.drawChart();
      this.drawTable();
    });
  }

  drawChart(force = false) {
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

  drawTable(force = false): void {
    if (this.energyData && this.tabulatorViewChild && (!this.table || force)) {
      this.table = new Tabulator(this.tabulatorViewChild.nativeElement, {
        columns: this.columnDefinitions,
        layout: 'fitColumns',
        pagination: true,
        paginationSize: 25,
        paginationSizeSelector: [10, 25, 50, -1],
        paginationInitialPage: 1,
        data: this.energyData,
        locale: 'de-at',
      });
    }
  }
}
