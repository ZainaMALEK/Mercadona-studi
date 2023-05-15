import { ProductMapper } from './../models/ProductMapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie, Promotion } from '../models/Product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl: string = environment.apiUrl + 'api/';
  /*  pathImages: string =
    'https://csb1003200284b3e222.blob.core.windows.net/mercadona-images/';
 */
  constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
    console.log(environment.production);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Products/products');
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Products/categories');
  }

  getPromotions(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Products/promotions');
  }

  addProduct(formData: FormData): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    return this.http.post<any>(this.apiUrl + 'Products/addProduct', formData);
  }

  addCategorie(libelle: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(
      this.apiUrl + 'Products/addCategorie',
      `"${libelle}"`,
      { headers: headers }
    );
  }

  addPromotion(promo: Promotion): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Products/addPromotion', promo);
  }

  editProduct(formData: FormData): Observable<any> {
    console.log(formData);

    return this.http.put<any>(this.apiUrl + 'Products/editProduct', formData);
  }

  removeItem(itemType: string, id: number) {
    const url = this.apiUrl + 'Products/' + itemType + `/remove/${id}`;
    return this.http.delete(url);
  }

  editItem(itemType: string, item: any) {
    console.log(itemType);

    let id;
    if (itemType == 'category') {
      id = item.categorieID;
    } else if (itemType == 'promotion') {
      console.log('promotion');

      id = item.promotionID;
    }
    let body = item;
    console.log(id);

    const url = this.apiUrl + 'Products/' + itemType + `/edit/${id}`;
    return this.http.put(url, body);
  }
}
