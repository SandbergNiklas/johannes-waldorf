using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Johannes.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddIsGalleryToImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGallery",
                table: "Images",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGallery",
                table: "Images");
        }
    }
}
