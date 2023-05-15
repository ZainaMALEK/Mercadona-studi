import { ProductsService } from 'src/app/services/products.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categorie, Produit, Promotion } from 'src/app/models/Product';
import { ProductMapper } from 'src/app/models/ProductMapper';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent {
public produit:Produit;
public produitCopy:Produit;
public productToSend: ProductMapper = new ProductMapper();
public categories:Categorie[];
public promotions:Promotion[];

  constructor(@Inject(MAT_DIALOG_DATA) public p: Produit, private productsService :ProductsService, public dialogRef: MatDialogRef<EditProduitComponent>) {
    this.produit = p;

    this.produitCopy = Object.assign({}, p);

    this.productsService.getCategories().subscribe(c => this.categories = c)
    this.productsService.getPromotions().subscribe(p => this.promotions = p)

    this.productToSend.produitID = this.produitCopy.produitID;
    this.productToSend.libelle = this.produitCopy.libelle;
    this.productToSend.description = this.produitCopy.description;
    this.productToSend.prix = this.produitCopy.prix;
    this.productToSend.categorieID = this.produitCopy.categorie.categorieID;
    if(this.produitCopy.promotion != null){

      this.productToSend.promotionID = this.produitCopy.promotion.promotionID;
    }
  }

  //pathImages:string = this.productsService.pathImages;

  editProduct(){
    const formData = new FormData();

    formData.append('productID', this.productToSend.produitID.toString());
    formData.append('libelle', this.productToSend.libelle);
    formData.append('description', this.productToSend.description);
    formData.append('prix', this.productToSend.prix.toString());
    formData.append('categorieID', this.productToSend.categorieID.toString());

    if(this.productToSend.promotionID != null && this.productToSend.promotionID != undefined && this.productToSend.promotionID >0){
      formData.append('promotionID', this.productToSend.promotionID.toString());
    }
    if(this.productToSend.image != null && this.productToSend.image != undefined){
      formData.append('image',  this.productToSend.image);
    }
    console.log(formData);

      this.productsService.editProduct(formData).subscribe((product: Produit) => {
        this.dialogRef.close(true);

      }, (error: any) => {
        console.log(error);
      });

  }

  handleFileInput(event: any) {
    console.log(event.target.files);

    const files: File[] = event.target.files;
    this.productToSend.image = files[0];
  }
}
