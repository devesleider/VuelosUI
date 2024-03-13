import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  readonly url = environment.api;
  private httpWithoutIntercepptor: HttpClient;
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutIntercepptor = new HttpClient(httpBackend);
  }

  createReservation(body){
    return this.httpWithoutIntercepptor.post(`${environment.api}reservations`, body);
  }
  
}
