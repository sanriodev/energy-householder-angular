import { DateTime } from 'luxon';

export class EnergyEntry {
  batteryPercent!: string;
  batteryVoltage!: string;
  batteryStatus!: string;
  batteryLevel!: number;
  occuredAt!: Date;
  occuredAtFormatted!: string;

  constructor(data: any) {
    Object.assign(this, data);
    this.occuredAtFormatted = DateTime.fromISO(data.occuredAt).toFormat(
      'dd. MMM. yyyy - HH:mm'
    );
  }
}
