using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations;

public class PlanetConfiguration : IEntityTypeConfiguration<Planet>
{
    public void Configure(EntityTypeBuilder<Planet> builder)
    {
        builder.ToTable("Planet").HasKey(p => p.Id);

        builder.Property(p => p.Name)
            .HasMaxLength(32)
            .HasColumnName("Name");
        builder.Property(p => p.Diameter)
            .HasPrecision(10)
            .HasColumnName("Diameter");
        builder.Property(p => p.Mass)
            .HasPrecision(10)
            .HasColumnName("Mass");
        builder.Property(p => p.SurfaceTemperature)
            .HasPrecision(2)
            .HasColumnName("SurfaceTemperature");
        builder.Property(p => p.DiscoveryDate)
            .HasColumnName("DiscoveryDate");

        builder
            .HasOne(p => p.Star)
            .WithMany(s => s.Planets)
            .HasForeignKey(p => p.StarId)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(p => p.PlanetType)
            .WithMany(pt => pt.Planets)
            .HasForeignKey(p => p.PlanetTypeId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
