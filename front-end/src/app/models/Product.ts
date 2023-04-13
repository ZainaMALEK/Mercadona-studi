export class Produit {
  produitID: number;
  libelle: string;
  description: string;
  prix: number;
  image: string;
  categorie: Categorie;
  promotion: Promotion;
}

export class Categorie {
  categorieID: number;
  libelle: string;
}

export class Promotion {
  promotionID: number;
  debut: Date;
  fin: Date;
  remise: number;
}
