using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Johannes.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Sections",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AltText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Caption = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UploadedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Sections",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Sections");
        }
    }
}
