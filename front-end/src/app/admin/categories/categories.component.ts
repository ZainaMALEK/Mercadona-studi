import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Categorie } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(private productService: ProductsService, public dialog: MatDialog,) {
   this.getCategories();
  }

  libelle: string;
  categories: Categorie[];

  submit() {
    this.productService.addCategorie(this.libelle).subscribe((data: any) => {
      this.categories.unshift({ categorieID: 0, libelle: data.libelle });
    });
  }

  deleteCategory(cat: Categorie) {

    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data:  { itemID: cat.categorieID, itemType: "category" }
    });

    dialogRef.afterClosed().subscribe((refresh: boolean) => {
      if (refresh) {
        this.getCategories();
      }
    });

  }

  getCategories(){
    this.productService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }
}
