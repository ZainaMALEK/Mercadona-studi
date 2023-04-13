using Backend.Models;
using Backend.Models.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Db_Context _context;
        public  ProductsController(Db_Context context)
        {
            _context = context;
        }
        [HttpGet("testApi")]
        public string testApi()
        {
       
            return "api ok";
        }
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Categories.ToList();
            return Ok(categories);
        }
        [HttpGet("promotions")]
        public IActionResult GetPromotions()
        {
            var promotions = _context.Promotions.ToList();
            return Ok(promotions);
        }

        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            var result = _context.Produits.ToList();
            return Ok(result);
        }

        [HttpPost("addProduct")]
        public IActionResult AddProduct(ProductMapper productM)
        {
            var categorie = _context.Categories.Where(c => c.CategorieID == productM.CategorieID).FirstOrDefault();
            var product = new Produit();
            product.Libelle = productM.Libelle;
            product.Description = productM.Description;
            product.Image = productM.Image;
            product.Prix = productM.Prix;
            product.Categorie = categorie;
            if (productM.PromotionID > 0)
            {
                var promotion = _context.Promotions.Where(p => p.PromotionID == productM.PromotionID).FirstOrDefault();
                product.Promotion = promotion;
            }
            _context.Produits.Add(product);
            _context.SaveChanges();

            return Ok(product);
        }
    }
}
