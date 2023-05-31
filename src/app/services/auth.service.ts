import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private userTypeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public userType$: Observable<number> = this.userTypeSubject.asObservable();
  
  constructor(private http: HttpClient) {
    const helper = new JwtHelperService();
    const token: any = localStorage.getItem('token');
    const decodeToken = helper.decodeToken(token);
    if (token) {
      this.isAuthenticatedSubject.next(true);
      if (decodeToken.role === 0) {
        this.userTypeSubject.next(0);
      } else if (decodeToken === 1) {
        this.userTypeSubject.next(1);
      } else {
        this.userTypeSubject.next(-1);
      }
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

  loginCheck(user: number) {
    this.isAuthenticatedSubject.next(true);
    this.userTypeSubject.next(user);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    this.userTypeSubject.next(-1);
  }
}