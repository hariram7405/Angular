using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAssignedToUserIdToBugs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedToUserId",
                table: "Bugs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_AssignedToUserId",
                table: "Bugs",
                column: "AssignedToUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Users_AssignedToUserId",
                table: "Bugs",
                column: "AssignedToUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Users_AssignedToUserId",
                table: "Bugs");

            migrationBuilder.DropIndex(
                name: "IX_Bugs_AssignedToUserId",
                table: "Bugs");

            migrationBuilder.DropColumn(
                name: "AssignedToUserId",
                table: "Bugs");
        }
    }
}
