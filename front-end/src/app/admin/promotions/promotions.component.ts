import { Component } from '@angular/core';
import { Promotion } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  constructor(private _productService: ProductsService){
    this._productService.getPromotions().subscribe(promo =>{
      this.promotions = promo ;
      console.log(promo);

    })
  }
  promotions :Promotion[];

}
