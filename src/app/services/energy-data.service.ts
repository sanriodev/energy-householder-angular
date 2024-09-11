import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnergyDataService {
  constructor(private http: HttpClient) {}

  getEnergyData(): Observable<any> {
    return this.http.get('http://pi.local:3000/api/v1/energy-data').pipe<any>(
      map<any, any>((res) => {
        if (res['success']) {
          return res['data'];
        } else return null;
      })
    );
  }
}
