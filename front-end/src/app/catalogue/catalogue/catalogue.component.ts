import { Produit } from 'src/app/models/Product';
import { ProductsService } from './../../services/products.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';



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
  @ViewChild('all', { static: false }) all: MatCheckbox;
  pathImages:string = "https://csb1003200284b3e222.blob.core.windows.net/mercadona-images/";
  categories!: Categorie[]
  products:Produit[] = [];
  selectedCategories :number[];
  filteredProducts:Produit[];
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
          this.filteredProducts = data;

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
    this.filterProducts();
  }

  getSelectedCategories(): string[] {
    return this.categoryChecker.categories.filter((c:any) => c.completed).map((c:any) => c.libelle);
  }

  /* uncheckAllCheckbox($event :any){
    console.log("hello");
    if (this.all ) {
      const check = this.all;
      check.checked = false;
    }
  } */
  filterProducts(){


    this.filteredProducts = this.products.filter(p => this.getSelectedCategories().includes( p.categorie.libelle) );
    console.log(this.categoryChecker.categories);
    console.log(this.getSelectedCategories());


     if (this.all.checked==true && (this.categoryChecker.categories.length != this.getSelectedCategories().length)) {//et une des categories n'est pas cochée

      this.all.checked = false;
    }
  }
}

