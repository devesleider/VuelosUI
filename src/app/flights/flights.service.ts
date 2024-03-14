import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  readonly url = environment.api;
  private httpWithoutIntercepptor: HttpClient;
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutIntercepptor = new HttpClient(httpBackend);
  }

  /**
  * Método para obtener todos los vuelos.
  * @returns Un Observable de los vuelos.
  */
  getflights() {
    return this.httpWithoutIntercepptor.get(`${environment.api}flights`);
  }

  /**
  * Método para obtener todos los vuelos que cumplan con los filtros.
  * @param filters Filtros para la busqueda de los vuelos.
  * @returns Un Observable de los vuelos.
  */
  getflightsFilters(filters: string) {
    return this.httpWithoutIntercepptor.get(`${environment.api}flights/filters?${filters}`);
  }

  /**
    * Método para crear los vuelos.
    * @param body Objeto JSON con los datos del vuelo.
    * @returns Un Observable que emite el vuelo creado.
    */
  createflight(body) {
    return this.httpWithoutIntercepptor.post(`${environment.api}flights`, body);
  }

}

