import { ProductMapper } from './../models/ProductMapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../models/Product';

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

  addProduct(formData: FormData): Observable<any> {

   // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<any>('http://localhost:9070/api/Products/addProduct', formData);
  }

  addCategorie(libelle: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:9070/api/Products/addCategorie', `"${libelle}"`, { headers: headers });
  }


  addPromotion(promo : Promotion): Observable<any> {

    return this.http.post<any>('http://localhost:9070/api/Products/addPromotion', promo);
  }
}
