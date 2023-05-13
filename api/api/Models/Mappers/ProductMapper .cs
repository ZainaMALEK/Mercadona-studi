using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace Backend.Models.Mappers
{
    public class ProductMapper
    {
        public int? ProductID { get; set; }
        public string Libelle { get; set; }
        public string Description { get; set; }
        public float Prix { get; set; }
        public IFormFile? Image { get; set; }
        public int CategorieID { get; set; }
        public int PromotionID { get; set; } = 0;
    }
}
