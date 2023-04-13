import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './admin/authentication/authentication.component';
import { CatalogueComponent } from './catalogue/catalogue/catalogue.component';
import { AdminInterfaceComponent } from './admin/admin-interface/admin-interface.component';

const routes: Routes = [
  { path: 'Admin', component: AuthenticationComponent },
  { path: 'AdminInterface', component: AdminInterfaceComponent },
  { path: '', component: CatalogueComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
