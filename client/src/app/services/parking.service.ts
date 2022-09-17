import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stay } from 'src/app/models/stay.model';
import { Vehicle } from '../models/vehicle.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  base = environment.base;
  private _refresh$ = new Subject<void>();
  constructor(
    private httpClient: HttpClient
  ) { }

  get $refresh(): Observable<any> {
    return this._refresh$;
  }

  getStay(): Observable<any> {
    return this.httpClient.get<Stay[]>(`${this.base}stay`)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  addEntry(stay: Stay): Observable<any> {
    let params = JSON.stringify(stay);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(`${this.base}stay/entry`, params, { "headers": headers });
  }

  addExit(stay: Stay): Observable<any> {
    let params = JSON.stringify(stay);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put(`${this.base}stay/exit`, params, { "headers": headers });
  }

  getVehicleType(vehicle_id: any) {
    return this.httpClient.get(`${this.base}vehicle/type/${vehicle_id}`);
  }

  getOficialVehicles() {
    return this.httpClient.get<Vehicle[]>(`${this.base}vehicles-oficial`);
  }

  addOficialVehicle(vehicle: Vehicle) {
    let params = JSON.stringify(vehicle);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(`${this.base}vehicle/add`, params, { "headers": headers });
  }

  getResidentsVehicles() {
    return this.httpClient.get<Vehicle[]>(`${this.base}vehicles-residents`);
  }

  addResidentVehicle(vehicle: Vehicle) {
    let params = JSON.stringify(vehicle);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(`${this.base}vehicle/add`, params, { "headers": headers });
  }

  restartMonth() {
    console.log('Reiniciando mes...');
    return this.httpClient.get(`${this.base}restart-month`);
  }

}
