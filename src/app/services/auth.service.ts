import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      this.loggedIn.next(true);
    }
  }

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
    const token = localStorage.getItem('token');
    return token;
  }

  ipToUserID(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'ipToUser', body);
  }
  
  loginCheck() {
    // Perform login logic here
    this.loggedIn.next(true);
  }

  logout() {
    // Perform logout logic here
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
