import { Component } from '@angular/core';
import { Produit } from 'src/app/models/Product';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  product:Produit = new Produit();
/* product:Produit ={
  produitID: 0,
  libelle: '',
  description: '',
  prix: 0,
  image: '',

} */;
onSubmit(){

}
}
