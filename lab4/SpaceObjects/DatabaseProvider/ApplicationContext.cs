using DatabaseProvider.Configurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

// корневая сущность, через которую мы работаем с базой данных
namespace DatabaseProvider
{
				public class ApplicationContext : DbContext
				{
								private readonly string _connectionString;

								// служебный конструктор -- нужен для ContextFactory
								public ApplicationContext(DbContextOptions<ApplicationContext> options)
												: base(options)
								{
								}

								public ApplicationContext(string connectionString)
								{
												_connectionString = connectionString;
								}

								protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
								{
												if (_connectionString == null)
												{
																return;
												}
												optionsBuilder.UseSqlServer(_connectionString);
								}

								protected override void OnModelCreating(ModelBuilder modelBuilder)
								{
												modelBuilder.ApplyConfiguration(new PlanetConfiguration());
												modelBuilder.ApplyConfiguration(new PlanetTypeConfiguration());
												modelBuilder.ApplyConfiguration(new StarConfiguration());
												modelBuilder.ApplyConfiguration(new StarHasAbsoluteMagnitudeConfiguration());
												modelBuilder.ApplyConfiguration(new StarTypeConfiguration());
								}
				}
}
