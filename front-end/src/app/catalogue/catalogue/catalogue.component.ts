import { Produit } from 'src/app/models/Product';
import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  products:Produit[] = [];

  constructor(private productsService :ProductsService){
    this.GetProducts();
  }

  GetProducts(): void {

      this.productsService.getProducts().subscribe({
        next:  (data: Produit[]) => {
          this.products = data;
          console.log(data);

        },
        error: error => {
          console.log(error);
        }
      });


  }

  ApplyPromo( price : number,  promo:number){
    return (price * promo) / 100;
  }
}
