import { ProductMapper } from './../models/ProductMapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  /* addProduct(product:any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<any>('http://localhost:9070/api/Products/addProduct', product, { headers });
  } */

  addProduct(formData: FormData): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<any>('http://localhost:9070/api/Products/addProduct', formData);
  }
}
