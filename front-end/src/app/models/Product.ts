export interface Produit {
  produitID: number;
  libelle: string;
  description: string;
  prix: number;
  image: string;
  categorie: Categorie;
  promotion: Promotion;
}

export interface Categorie {
  categorieID: number;
  libelle: string;
}

export interface Promotion {
  promotionID: number;
  debut: Date;
  fin: Date;
  remise: number;
}
