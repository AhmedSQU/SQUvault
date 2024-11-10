using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SquValut.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddFilePathToChallenges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FilePath",
                table: "Challenges",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FilePath",
                table: "Challenges");
        }
    }
}
