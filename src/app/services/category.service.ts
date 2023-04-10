import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }



  addCategory(body: object): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'add-category', body);
  }


  getCategories(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getCategories');
  }


  getSubCategories(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'getSubCategories');
  }


  getCategoryById(body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'getCategoriesById', body);
  }
}