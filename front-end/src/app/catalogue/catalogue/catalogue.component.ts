import { Produit } from 'src/app/models/Product';
import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';


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

  task: any = {
    name: 'Tout',
    completed: false,
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
        this.task.categories = data;
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

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.categories != null && this.categories.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.categories == null) {
      return false;
    }
    return this.categories.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.categories == null) {
      console.log("cat null");

      return;
    }
    this.task.categories.forEach((t:any) => (t.completed = completed));
  }

  getSelectedCategories(): string[] {
    return this.task.categories.filter((c:any) => c.completed).map((c:any) => c.libelle);
  }
}

