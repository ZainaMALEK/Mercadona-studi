import { Produit } from 'src/app/models/Product';
import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';



export interface Categorie {
  libelle: string;
  completed: boolean;
  color: ThemePalette;

}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})

export class CatalogueComponent {
  categories!: Categorie[]
  products:Produit[] = [];

  categoryChecker: any = {
    name: 'Tout',
    completed: true,
    color: 'green',
    categories :[]
     ,
  };

  constructor(private productsService :ProductsService){
    this.GetProducts();
    this.GetCategories();
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

  GetCategories(): void {

    this.productsService.getCategories().subscribe({
      next:  (data: Categorie[]) => {
        this.categoryChecker.categories = data;
        console.log(data);
        this.setAll(true);

      },
      error: error => {
        console.log(error);
      }
    });

}

  ApplyPromo( price : number,  promo:number){
    return price - ((price * promo) / 100);
  }

  setAll(completed: boolean) {
    if (this.categoryChecker.categories == null) {
      console.log("cat null");

      return;
    }
    this.categoryChecker.categories.forEach((t:any) => (t.completed = completed));
  }

  getSelectedCategories(): string[] {
    return this.categoryChecker.categories.filter((c:any) => c.completed).map((c:any) => c.libelle);
  }
}

