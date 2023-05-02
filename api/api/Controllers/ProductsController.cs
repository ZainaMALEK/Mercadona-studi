//using Backend.Models;
//using Backend.Models.Mappers;
using api.Services.Abstract;
using Backend.Models;
using Backend.Models.Mappers;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IImageService _imageService;
        private string pathImages = @"C:\Mercadona\images";
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(Db_Context context, IImageService imageService)
        {
            _context = context;
            _imageService = imageService;
         
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
            
            try
            {
                var results = _context.Produits.ToList();
                var result = _context.Produits
            .Select(p => new
            {
                produitID = p.ProduitID,
                libelle = p.Libelle,
                description = p.Description,
                prix = p.Prix,
                //image = Convert.ToBase64String(System.IO.File.ReadAllBytes(p.ImagePath)),
                image = p.ImagePath,
                categorie = p.Categorie,
                promotion = p.Promotion
            })
            .ToList()
            .OrderByDescending(p => p.produitID);
                return Ok(result);
            }
            catch (Exception err)
            {
               
                return StatusCode(500, err.Message);

            }

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
                product.ImagePath =  _imageService.UploadImageToAzure(file);
               /* if (!Directory.Exists(pathImages))
                {
                    Directory.CreateDirectory(pathImages);
                }
                string imageName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                var filePath = Path.Combine(pathImages, imageName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }*/
                // Mettre à jour le chemin d'accès du fichier dans la base de données
                //product.ImagePath = filePath;

            }

            _context.Produits.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        [Authorize]
        [HttpPost("addCategorie")]
        public IActionResult AddCategorie([FromBody] string libelle)
        {
            var categorie = new Categorie();
            categorie.Libelle = libelle;
            _context.Categories.Add(categorie);
            _context.SaveChanges();
            return Ok(categorie);
        }

        [Authorize]
        [HttpPost("addPromotion")]
        public IActionResult AddPromotion(Promotion promotion)
        {
            var prom = new Promotion();
            prom.Debut = promotion.Debut;
            prom.Fin = promotion.Fin;
            prom.Remise = promotion.Remise;
            _context.Promotions.Add(prom);
            _context.SaveChanges();
            return Ok(prom);
        }
    }
}

