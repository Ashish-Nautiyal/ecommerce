import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'sign-up', body);
  }

  quickSignup(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'quickSignup', body);
  }

  login(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'login', body);
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }
}