import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthenticationComponent } from './admin/authentication/authentication.component';
import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { PromotionsComponent } from './admin/promotions/promotions.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProduitsComponent } from './admin/produits/produits.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptor } from './services/auth-interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import { EditProduitComponent } from './admin/edit-produit/edit-produit.component';
import { DeleteItemComponent } from './admin/delete-item/delete-item.component';


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

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
    EditProduitComponent,
    DeleteItemComponent,

  ],
  imports: [

    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://mercadona-api.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),

  ],

  providers: [AuthenticationService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }


