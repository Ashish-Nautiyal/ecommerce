import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'addProduct', body);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getProducts');
  }

  getProductByCatId(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getProductByCatId', body);
  }

  getProductByProductId(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getProductByProductId', body);
  }

  updateProducts(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'updateProduct', body);
  }

  deleteProducts(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'deleteProduct?id=' + body);
  }

  makePayment(stripeToken: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'payment', stripeToken);
  } 
}