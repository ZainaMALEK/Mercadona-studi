using Backend.Models;
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

        [HttpGet("Products")]
        public IActionResult GetProducts()
        {
            var result = _context.Produits.ToList();
            return Ok(result);
        }
    }
}
