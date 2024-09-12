export const weatherHttpParams: {
  latitude: number;
  longitude: number;
  hourly: string | string[];
  daily: string | string[];
  timezone: string;
  forecast_days: number;
} = {
  latitude: 47.1167,
  longitude: 10.6167,
  hourly: ['temperature_2m', 'rain'],
  daily: ['daylight_duration', 'sunshine_duration'],
  timezone: 'Europe/Berlin',
  forecast_days: 1,
};
