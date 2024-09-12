export class WeatherDataModel {
  latitude!: number;
  longitude!: number;
  elevation!: number;
  generationtime_ms!: number;
  utc_offset_second!: number;
  timezone!: string;
  timezone_abbreviation!: string;
  hourly!: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units!: {
    temperature_2m: string;
  };
  constructor(data: Partial<WeatherDataModel>) {
    Object.assign(this, data);
  }
}
