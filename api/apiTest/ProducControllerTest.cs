using Backend.Controllers;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;




namespace Backend.Tests.Controllers
{
    [TestFixture]
    public class ProductsControllerTests
    {
        private ProductsController _controller;
        private DbContextOptions<Db_Context> _options;

        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<Db_Context>()
                .UseInMemoryDatabase(databaseName: "testDatabase")
                .Options;

            using (var context = new Db_Context(_options))
            {
                context.Categories.Add(new Categorie { CategorieID = 1, Libelle = "Category 1" });
                context.Categories.Add(new Categorie { CategorieID = 2, Libelle = "Category 2" });
                context.SaveChanges();
            }

            _controller = new ProductsController(new Db_Context(_options), null);
        }

        [Test]
        public void GetCategories_ReturnsOkResultWithCategoriesList()
        {
            // Arrange
            var expectedCategories = new List<Categorie>
            {
                new Categorie { CategorieID = 1, Libelle = "Category 1" },
                new Categorie { CategorieID = 2, Libelle = "Category 2" }
            };

            // Act
            var result = _controller.GetCategories();

            // Assert
            Assert.IsInstanceOf<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsInstanceOf<List<Categorie>>(okResult.Value);
            var actualCategories = okResult.Value as List<Categorie>;
            Assert.AreEqual(expectedCategories.Count, actualCategories.Count);
            for (int i = 0; i < expectedCategories.Count; i++)
            {
                Assert.AreEqual(expectedCategories[i].CategorieID, actualCategories[i].CategorieID);
                Assert.AreEqual(expectedCategories[i].Libelle, actualCategories[i].Libelle);
            }
        }
    }
}
