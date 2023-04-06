using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class relationTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategorieID",
                table: "Produits",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PromotionID",
                table: "Produits",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Produits_CategorieID",
                table: "Produits",
                column: "CategorieID");

            migrationBuilder.CreateIndex(
                name: "IX_Produits_PromotionID",
                table: "Produits",
                column: "PromotionID");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Categories_CategorieID",
                table: "Produits",
                column: "CategorieID",
                principalTable: "Categories",
                principalColumn: "CategorieID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Promotions_PromotionID",
                table: "Produits",
                column: "PromotionID",
                principalTable: "Promotions",
                principalColumn: "PromotionID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produits_Categories_CategorieID",
                table: "Produits");

            migrationBuilder.DropForeignKey(
                name: "FK_Produits_Promotions_PromotionID",
                table: "Produits");

            migrationBuilder.DropIndex(
                name: "IX_Produits_CategorieID",
                table: "Produits");

            migrationBuilder.DropIndex(
                name: "IX_Produits_PromotionID",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "CategorieID",
                table: "Produits");

            migrationBuilder.DropColumn(
                name: "PromotionID",
                table: "Produits");
        }
    }
}
