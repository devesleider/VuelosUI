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

  getflights(){
    return this.httpWithoutIntercepptor.get(`${environment.api}flights`);
  }

  getflightsFilters(filters: string){
    return this.httpWithoutIntercepptor.get(`${environment.api}flights/filters?${filters}`);
  }

  createflight(body){
    return this.httpWithoutIntercepptor.post(`${environment.api}flights`, body);
  }
  
}

