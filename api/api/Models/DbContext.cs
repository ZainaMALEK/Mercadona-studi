using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Db_Context : DbContext
    {
        public Db_Context(DbContextOptions<Db_Context> options)
                : base(options)
        {
        }

        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Produit> Produits { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<Utilisateur> Utilisateurs { get; set; }

       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
            optionsBuilder.UseNpgsql(connectionString);
            optionsBuilder.UseLazyLoadingProxies();
        }
    }   
}
