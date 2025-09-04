using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTracker.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRelationshipToBugs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Users_AssignedToUserId",
                table: "Bugs");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Users_AssignedToUserId",
                table: "Bugs",
                column: "AssignedToUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Users_AssignedToUserId",
                table: "Bugs");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Users_AssignedToUserId",
                table: "Bugs",
                column: "AssignedToUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
