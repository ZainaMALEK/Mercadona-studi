using Backend.Models;
using Backend.Models.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Db_Context _context;
        private string pathImages = @"C:\Mercadona\images";
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
        public async Task<IActionResult> AddProduct([FromForm] ProductMapper productM)
        {
            var categorie = _context.Categories.Where(c => c.CategorieID == productM.CategorieID).FirstOrDefault();
            var product = new Produit();
            product.Libelle = productM.Libelle;
            product.Description = productM.Description;
            product.Prix = productM.Prix;
            product.Categorie = categorie;
            if (productM.PromotionID > 0)
            {
                var promotion = _context.Promotions.Where(p => p.PromotionID == productM.PromotionID).FirstOrDefault();
                product.Promotion = promotion;
            }

            var file = productM.Image;
            // Enregistrer l'image sur le serveur
            if (file != null && file.Length > 0)
            {
                if (!Directory.Exists(pathImages))
                {
                    Directory.CreateDirectory(pathImages);
                }
                string imageName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                var filePath = Path.Combine(pathImages, imageName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                // Mettre à jour le chemin d'accès du fichier dans la base de données
                product.ImagePath = filePath;
               
            }
            _context.Produits.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }
    }
}
