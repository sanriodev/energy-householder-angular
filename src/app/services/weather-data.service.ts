import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherDataModel } from '../models/weather-data.model';
import { weatherHttpParams } from '../common/constants/weather.params';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<WeatherDataModel | undefined> {
    return this.http
      .get('https://api.open-meteo.com/v1/forecast', {
        params: weatherHttpParams,
      })
      .pipe<WeatherDataModel>(
        map<any, any>((res) => {
          if (res) {
            return new WeatherDataModel(res);
          } else return;
        })
      );
  }
}
