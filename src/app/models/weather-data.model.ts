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
    rain: number[];
  };
  hourly_units!: {
    temperature_2m: string;
    rain: string;
  };
  daily!: {
    daylight_duration?: (string | number)[];
    sunshine_duration?: (string | number)[];
  };
  constructor(data: Partial<WeatherDataModel>) {
    Object.assign(this, data);
    if (data.daily) {
      if (this.daily.daylight_duration) {
        this.daily.daylight_duration = this.daily.daylight_duration.map((d) =>
          (Number(d) / 3660).toPrecision(3)
        );
      }
      if (this.daily.sunshine_duration) {
        this.daily.sunshine_duration = this.daily.sunshine_duration.map((d) =>
          (Number(d) / 3660).toPrecision(3)
        );
      }
    }
  }
}
