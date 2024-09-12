import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EnergyEntry } from '../models/energy-entry.model';
import { WeatherDataModel } from '../models/weather-data.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<WeatherDataModel> {
    return this.http
      .get('http://pi.local:3000/api/v1/energy-data')
      .pipe<WeatherDataModel>(
        map<any, WeatherDataModel>((res) => {
          if (res['success']) {
            return res['data']?.map((entry: WeatherDataModel) => {
              return new WeatherDataModel(entry);
            });
          } else return null;
        })
      );
  }
}
