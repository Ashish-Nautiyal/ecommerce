import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {

  constructor(private http:HttpClient) { }

  addShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addShippingAddress', body);
  }

  getShippingAddress(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getShippingAddress', body);
  }
}