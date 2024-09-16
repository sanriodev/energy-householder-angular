import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EnergyEntry } from '../../models/energy-entry.model';
import { EnergyDataService } from '../../services/energy-data.service';
import { ColumnDefinition, Tabulator } from 'tabulator-tables';

@Component({
  selector: 'app-heartbeat-overview',
  templateUrl: './heartbeat-overview.component.html',
  styleUrls: ['./heartbeat-overview.component.scss'],
})
export class HeartbeatOverviewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    @Inject(EnergyDataService)
    private readonly energyService: EnergyDataService
  ) {}

  @ViewChild('tabulator') tabulatorViewChild?: ElementRef<HTMLDivElement>;
  energyData: EnergyEntry[] = [];
  table?: Tabulator;
  nodeTimer?: NodeJS.Timeout;

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
    this.nodeTimer = setInterval(
      () =>
        this.energyService.getEnergyData().subscribe((data) => {
          this.energyData = data;
          this.drawTable();
        }),
      30000
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.nodeTimer);
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
