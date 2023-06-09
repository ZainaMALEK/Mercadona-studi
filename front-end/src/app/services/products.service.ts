import { ProductMapper } from './../models/ProductMapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../models/Product';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl:string = environment.apiUrl + "api/"
  //apiUrl:string = "http://localhost:17453/api/";

  constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
    console.log(environment.production);

   }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl +'Products/products');
  }
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl +'Products/categories');
  }
  getPromotions(): Observable<any> {
    return this.http.get<any>(this.apiUrl +'Products/promotions');
  }

  addProduct(formData: FormData): Observable<any> {

   // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<any>(this.apiUrl +'Products/addProduct', formData);
  }

  addCategorie(libelle: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl +'Products/addCategorie', `"${libelle}"`, { headers: headers });
  }


  addPromotion(promo : Promotion): Observable<any> {

    return this.http.post<any>(this.apiUrl +'Products/addPromotion', promo);
  }
}
