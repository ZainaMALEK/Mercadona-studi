import { Produit } from 'src/app/models/Product';
import { ProductsService } from './../../services/products.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditProduitComponent } from 'src/app/admin/edit-produit/edit-produit.component';
import { DeleteItemComponent } from 'src/app/admin/delete-item/delete-item.component';

export interface Categorie {
  libelle: string;
  completed: boolean;
  //color: black;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent {
  @ViewChild('all', { static: false }) all: MatCheckbox;
  pathImages: string =
    'https://csb1003200284b3e222.blob.core.windows.net/mercadona-images/';
  categories!: Categorie[];
  products: Produit[] = [];
  selectedCategories: number[];
  filteredProducts: Produit[];
  categoryChecker: any = {
    name: 'Tout',
    completed: true,
    //color: 'black',
    categories: [],
  };
  loading: boolean = false;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {
    this.GetProducts();
    this.GetCategories();
  }
  deleteProduct(product: Produit) {
    //adapter ensuite a categorie ou promotion
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.GetProducts();
      }
    });
  }

  openEditProduct(product: Produit) {
    const dialogRef = this.dialog.open(EditProduitComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.GetProducts();
      }
    });
  }

  GetProducts(): void {
    this.loading = true;
    this.productsService.getProducts().subscribe({
      next: (data: Produit[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  GetCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (data: Categorie[]) => {
        this.categoryChecker.categories = data;
        this.setAll(true);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ApplyPromo(price: number, promo: number) {
    return price - (price * promo) / 100;
  }

  setAll(completed: boolean) {
    if (this.categoryChecker.categories == null) {
      return;
    }
    this.categoryChecker.categories.forEach(
      (t: any) => (t.completed = completed)
    );
    this.filterProducts();
  }

  getSelectedCategories(): string[] {
    return this.categoryChecker.categories
      .filter((c: any) => c.completed)
      .map((c: any) => c.libelle);
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((p) =>
      this.getSelectedCategories().includes(p.categorie.libelle)
    );

    if (
      this.all.checked == true &&
      this.categoryChecker.categories.length !=
        this.getSelectedCategories().length
    ) {
      //et une des categories n'est pas cochée

      this.all.checked = false;
    }
  }
}
