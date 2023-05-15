import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categorie, Produit, Promotion } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent {
  category: Categorie;
  promotion: Promotion;
  itemType: string;
  startDate: string ;
  endDate: string ;
  selectedDate: Date;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<EditItemComponent>
  ) {
    console.log(this.data.item, this.data.itemType);
    this.itemType = this.data.itemType;
    if (this.itemType == 'category') {
      this.category = this.data.item;
    } else if (this.itemType == 'promotion') {
      this.promotion = this.data.item;

      const promotionDatedebut = new Date(this.promotion.debut);
      promotionDatedebut.setUTCHours(0);
      promotionDatedebut.setUTCMinutes(0);
      promotionDatedebut.setUTCSeconds(0);
      promotionDatedebut.setUTCMilliseconds(0);

      const promotionDatefin = new Date(this.promotion.fin);
      promotionDatefin.setUTCHours(0);
      promotionDatefin.setUTCMinutes(0);
      promotionDatefin.setUTCSeconds(0);
      promotionDatefin.setUTCMilliseconds(0);

      this.startDate =  new Date(promotionDatedebut).toISOString().split('T')[0];
      this.endDate  = new Date(promotionDatefin).toISOString().split('T')[0];
      console.log(this.promotion.debut);

      console.log(this.startDate);

    }
  }

  formatToDate(dateTime: string): string {
    return dateTime.split('T')[0];
  }

  edit() {
    if (this.itemType == 'category') {
      this.productsService.editItem(this.itemType, this.category).subscribe(resp=>{
        this.dialogRef.close(true);

      })
    } else if (this.itemType == 'promotion') {

      let datedebut = new Date(this.startDate);
      let datefin = new Date(this.endDate);

      this.promotion.debut = datedebut;
      this.promotion.fin = datefin;

      this.productsService.editItem(this.itemType, this.promotion).subscribe(resp=>{
        this.dialogRef.close(true);

      })
  }}
  close(){
    this.dialogRef.close(false);
  }
}
