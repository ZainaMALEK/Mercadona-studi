import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produit } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent {
/*   constructor (@Inject(MAT_DIALOG_DATA) public p: Produit, private productsService :ProductsService, public dialogRef: MatDialogRef<DeleteItemComponent>){
 */
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, private productsService :ProductsService, public dialogRef: MatDialogRef<DeleteItemComponent>){

  }
  delete(){
    console.log(this.data.itemID, this.data.itemType);

    this.productsService.removeItem(this.data.itemType, this.data.itemID).subscribe(resp =>{

      this.dialogRef.close(true);

    })
  }
  close(){
    this.dialogRef.close(false);
  }
}
