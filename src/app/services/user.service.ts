import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getProfile', body)
  }

  updateProfile(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateProfile', body)
  }

  ipToUserID(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'ipToUser', body);
  }  
}