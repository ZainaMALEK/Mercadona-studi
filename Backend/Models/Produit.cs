using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Produit
    {
        public int ProduitID { get; set; }
        public string Libelle { get; set; }
        public string Description { get; set; }
        public float Prix { get; set; }
        public string Image { get; set; }
        public Categorie Categorie { get; set; }
        public Promotion Promotion { get; set; }
    }
}
