using SpaceObjectsMigrations;
using Microsoft.EntityFrameworkCore;

ContextFactory contextFactory = new();
contextFactory.CreateDbContext(args).Database.Migrate();
