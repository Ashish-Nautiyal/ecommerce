import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PromocodeService {

  constructor(private http: HttpClient) { }

  savePromocode(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'savePromocode', body);
  }
}