import { Component } from '@angular/core';
import { Categorie } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private productService:ProductsService){
    this.productService.getCategories().subscribe(cats => {
      this.categories =  cats ;
    })
  }

  libelle : string;
  categories : Categorie [];

  submit(){
    this.productService.addCategorie(this.libelle).subscribe((data:any) =>{

        this.categories.unshift({categorieID :0, libelle : data.libelle});
    })
  }
}
