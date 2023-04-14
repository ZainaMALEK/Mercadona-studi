import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './admin/authentication/authentication.component';
import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProduitsComponent } from './admin/produits/produits.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    AuthenticationComponent,
    AdminInterfaceComponent,
    NavbarComponent,
    PromotionsComponent,
    CategoriesComponent,
    ProduitsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
