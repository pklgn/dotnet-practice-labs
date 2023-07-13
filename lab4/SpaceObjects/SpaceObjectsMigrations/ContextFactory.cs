// See https://aka.ms/new-console-template for more information
using DatabaseProvider;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace SpaceObjectsMigrations;

public class ContextFactory : IDesignTimeDbContextFactory<ApplicationContext>
{
    public ApplicationContext CreateDbContext(string[] args)
    {
        string connectionString =
            "Data Source=LAPTOP-TTKQ5B2C\\SQLEXPRESS;Initial Catalog=SpaceObjectsDb;Pooling=true;Integrated Security=SSPI;Encrypt=True;TrustServerCertificate=True";
        var optionalBuilder = new DbContextOptionsBuilder<ApplicationContext>();

        optionalBuilder.UseSqlServer(connectionString,
            assembly => assembly.MigrationsAssembly("SpaceObjectsMigrations"));

        return new ApplicationContext(optionalBuilder.Options);
    }
}
