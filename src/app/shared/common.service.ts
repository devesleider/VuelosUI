import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly url = environment.api;
  private httpWithoutIntercepptor: HttpClient;
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutIntercepptor = new HttpClient(httpBackend);
  }
  
  getAirlines() {
    return this.httpWithoutIntercepptor.get(`${environment.api}airlines`);
  }

  getAirports() {
    return this.httpWithoutIntercepptor.get(`${environment.api}airports`);
  }
}
