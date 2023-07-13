using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpaceObjectsMigrations.Migrations
{
    /// <inheritdoc />
    public partial class initial_migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlanetType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanetType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StarType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StarType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Star",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    StarTypeId = table.Column<int>(type: "int", nullable: false),
                    Diameter = table.Column<float>(type: "real", nullable: false),
                    Mass = table.Column<float>(type: "real", nullable: false),
                    Magnitude = table.Column<float>(type: "real", nullable: false),
                    Temperature = table.Column<float>(type: "real", nullable: false),
                    DiscoveryDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Star", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Star_StarType_StarTypeId",
                        column: x => x.StarTypeId,
                        principalTable: "StarType",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Planet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    PlanetTypeId = table.Column<int>(type: "int", nullable: false),
                    StarId = table.Column<int>(type: "int", nullable: false),
                    Diameter = table.Column<float>(type: "real", nullable: false),
                    Mass = table.Column<float>(type: "real", nullable: false),
                    SurfaceTemperature = table.Column<float>(type: "real", nullable: false),
                    DiscoveryDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Planet_PlanetType_PlanetTypeId",
                        column: x => x.PlanetTypeId,
                        principalTable: "PlanetType",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Planet_Star_StarId",
                        column: x => x.StarId,
                        principalTable: "Star",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StarHasAbsoluteMagnitude",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StarId = table.Column<int>(type: "int", nullable: false),
                    AbsoluteMagnitude = table.Column<float>(type: "real", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StarHasAbsoluteMagnitude", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StarHasAbsoluteMagnitude_Star_StarId",
                        column: x => x.StarId,
                        principalTable: "Star",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Planet_PlanetTypeId",
                table: "Planet",
                column: "PlanetTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Planet_StarId",
                table: "Planet",
                column: "StarId");

            migrationBuilder.CreateIndex(
                name: "IX_Star_StarTypeId",
                table: "Star",
                column: "StarTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_StarHasAbsoluteMagnitude_StarId",
                table: "StarHasAbsoluteMagnitude",
                column: "StarId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Planet");

            migrationBuilder.DropTable(
                name: "StarHasAbsoluteMagnitude");

            migrationBuilder.DropTable(
                name: "PlanetType");

            migrationBuilder.DropTable(
                name: "Star");

            migrationBuilder.DropTable(
                name: "StarType");
        }
    }
}
