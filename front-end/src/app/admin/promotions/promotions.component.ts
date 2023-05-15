import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Promotion } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {
  constructor(private _productService: ProductsService ,public dialog: MatDialog){
    this.getPromotions();
  }

  promotions :Promotion[];
  today = new Date();
  startDate: string =  new Date().toISOString().split('T')[0];
  endDate: string  =new Date().toISOString().split('T')[0];
  remise:number;
  errorDate:boolean = false;

  getPromotions(){
    this._productService.getPromotions().subscribe(promo =>{
      this.promotions = promo ;

    })
  }

  submitForm() {
    let datedebut = new Date(this.startDate);
    let datefin = new Date(this.endDate);
    if(datedebut<= datefin){
      let promoMap = new Promotion(datedebut, datefin, this.remise);
      this._productService.addPromotion(promoMap).subscribe(data =>{
        console.log(data);
        this.promotions.unshift(data)
        this.errorDate=false;

      },
      error => {
        console.log("Une erreur s'est produite : ", error);
      })
    }else{
      this.errorDate=true;
    }

  }

  deletePromotion(prom: Promotion) {

    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data:  { itemID: prom.promotionID, itemType: "promotion" }
    });

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.getPromotions();
      }
    });

  }


}
