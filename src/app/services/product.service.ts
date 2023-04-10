import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import { products, response } from '../interfaces/interface';


@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(body: object): Observable<response> {
    return this.http.post<response>(environment.baseUrl + 'add-product', body);
  }


  getProducts(): Observable<products> {
    return this.http.get<products>(environment.baseUrl + 'display-product');
  }


  deleteProducts(body: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + 'delete-product?id=' + body);
  }





}