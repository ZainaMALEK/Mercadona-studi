import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:9070/api/Products/products');
  }
  getCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:9070/api/Products/categories');
  }
  getPromotions(): Observable<any> {
    return this.http.get<any>('http://localhost:9070/api/Products/promotions');
  }
}
