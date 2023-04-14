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
      console.log(this.products);

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
    formData.append('promotionID', this.product.promotionID.toString());

    formData.append('image',  this.product.image)

    console.log(this.product.image);

    this._productsService.addProduct(formData).subscribe((product: Produit) => {
      console.log(product);
      this.products.unshift(product)
    }, (error: any) => {
      console.log(error);
    });
  }
}


