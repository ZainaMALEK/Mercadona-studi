﻿// <auto-generated />
using System;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(Db_Context))]
    partial class Db_ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Categorie", b =>
                {
                    b.Property<int>("CategorieID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CategorieID"));

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("CategorieID");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Backend.Models.Produit", b =>
                {
                    b.Property<int>("ProduitID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ProduitID"));

                    b.Property<int>("CategorieID")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Libelle")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("Prix")
                        .HasColumnType("real");

                    b.Property<int?>("PromotionID")
                        .HasColumnType("integer");

                    b.HasKey("ProduitID");

                    b.HasIndex("CategorieID");

                    b.HasIndex("PromotionID");

                    b.ToTable("Produits");
                });

            modelBuilder.Entity("Backend.Models.Promotion", b =>
                {
                    b.Property<int>("PromotionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("PromotionID"));

                    b.Property<DateTime>("Debut")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Fin")
                        .HasColumnType("timestamp with time zone");

                    b.Property<float>("Remise")
                        .HasColumnType("real");

                    b.HasKey("PromotionID");

                    b.ToTable("Promotions");
                });

            modelBuilder.Entity("Backend.Models.Utilisateur", b =>
                {
                    b.Property<int>("UtilisateurID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("UtilisateurID"));

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("UtilisateurID");

                    b.ToTable("Utilisateurs");
                });

            modelBuilder.Entity("Backend.Models.Produit", b =>
                {
                    b.HasOne("Backend.Models.Categorie", "Categorie")
                        .WithMany()
                        .HasForeignKey("CategorieID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Models.Promotion", "Promotion")
                        .WithMany()
                        .HasForeignKey("PromotionID");

                    b.Navigation("Categorie");

                    b.Navigation("Promotion");
                });
#pragma warning restore 612, 618
        }
    }
}
