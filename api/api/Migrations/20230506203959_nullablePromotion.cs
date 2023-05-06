using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class nullablePromotion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produits_Promotions_PromotionID",
                table: "Produits");

            migrationBuilder.AlterColumn<int>(
                name: "PromotionID",
                table: "Produits",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Promotions_PromotionID",
                table: "Produits",
                column: "PromotionID",
                principalTable: "Promotions",
                principalColumn: "PromotionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produits_Promotions_PromotionID",
                table: "Produits");

            migrationBuilder.AlterColumn<int>(
                name: "PromotionID",
                table: "Produits",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Produits_Promotions_PromotionID",
                table: "Produits",
                column: "PromotionID",
                principalTable: "Promotions",
                principalColumn: "PromotionID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
