import { ProductMapper } from './../../models/ProductMapper';
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

  product:ProductMapper = new ProductMapper();
  categories : Categorie[];
  promotions : Promotion[];

  onSubmit(){
    this._productsService.addProduct(this.product).subscribe(resp =>{
      console.log(resp);

    })

  }
}
