import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }


  addWishlist(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addWishlist', body);
  }


  getWishlist(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getWishlist', body);
  }


  removeWishlist(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'removeWishlist', body);
  }
}
