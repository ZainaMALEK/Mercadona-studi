import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import { Categorie, Produit, Promotion } from 'src/app/models/Product';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  constructor(private  _productsService : ProductsService ){

  }
  ngOnInit(){
    this._productsService.getCategories().subscribe(cat=>{
      this.categories = cat;
      console.log(this.categories);

    });
    this._productsService.getPromotions().subscribe(p=>{
      this.promotions = p;
      console.log(this.promotions);

    })
  }
  product:Produit = new Produit();
  categories : Categorie[];
  promotions : Promotion[];
/* product:Produit ={
  produitID: 0,
  libelle: '',
  description: '',
  prix: 0,
  image: '',

} */;
onSubmit(){

}
}
