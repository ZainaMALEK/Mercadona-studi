using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class changeImageToImagePath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "Produits",
                newName: "ImagePath");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImagePath",
                table: "Produits",
                newName: "Image");
        }
    }
}
