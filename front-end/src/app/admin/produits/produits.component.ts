import { Component } from '@angular/core';
import { Categorie, Produit, Promotion } from 'src/app/models/Product';
import { ProductMapper } from 'src/app/models/ProductMapper';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {
  constructor(private  _productsService : ProductsService ){

  }
  ngOnInit(){

    this._productsService.getProducts().subscribe(p=>{
      this.products = p;

    });

    this._productsService.getCategories().subscribe(cat=>{
      this.categories = cat;
    });

    this._productsService.getPromotions().subscribe(p=>{
      this.promotions = p;
    })

  }

  imageFile: File;
  product:ProductMapper = new ProductMapper();
  categories : Categorie[];
  promotions : Promotion[];
  products:Produit[];
  errorMsg = false;

  handleFileInput(event: any) {

    const files: File[] = event.target.files;
    this.product.image = files[0];
  }




  onSubmit() {

    const formData = new FormData();
    formData.append('libelle', this.product.libelle);
    formData.append('description', this.product.description);
    formData.append('prix', this.product.prix.toString());
    formData.append('categorieID', this.product.categorieID.toString());
    if(this.product.promotionID != null && this.product.promotionID != undefined && this.product.promotionID >0){
      formData.append('promotionID', this.product.promotionID.toString());
    }
    if(this.product.image != null && this.product.image != undefined){
      formData.append('image',  this.product.image);
      this._productsService.addProduct(formData).subscribe((product: Produit) => {
        this.products.unshift(product);
        this.errorMsg = false;
      }, (error: any) => {
        console.log(error);
      });
    }else{
      this.errorMsg = true;
    }





  }
}


