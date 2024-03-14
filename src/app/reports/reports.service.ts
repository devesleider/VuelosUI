import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  readonly url = environment.api;
  private httpWithoutIntercepptor: HttpClient;
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutIntercepptor = new HttpClient(httpBackend);
  }

  /**
  * Método para obtener las aerolineas con mas reservas.
  * @returns Un Observable que emite las aerolineas.
  */
  getTopReservation() {
    return this.httpWithoutIntercepptor.get(`${environment.api}reports/topReservation`);
  }

  /**
  * Método para obtener el número de aerolineas.
  * @returns Un Observable que emite el número de aerolineas.
  */
  getCountAirlines() {
    return this.httpWithoutIntercepptor.get(`${environment.api}reports/countAirline`);
  }
}
