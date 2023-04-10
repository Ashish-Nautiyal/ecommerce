import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  constructor(private http: HttpClient) { }

  addVariant(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'add-variant', body);
  }

  getVariants(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getVariants');
  }


  addAttribute(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'add-Attribute', body);
  }
}