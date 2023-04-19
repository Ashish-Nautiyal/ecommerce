import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { response } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(body: object): Observable<response> {
    return this.http.post<response>(environment.baseUrl + 'sign-up', body);
  }

  quickSignup(body: object): Observable<response> {
    return this.http.post<response>(environment.baseUrl + 'quickSignup', body);
  }


  login(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'login', body);
  }
}