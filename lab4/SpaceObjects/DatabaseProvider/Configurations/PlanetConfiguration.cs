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
            .HasColumnName("Diameter");
        builder.Property(p => p.Mass)
            .HasColumnName("Mass");
        builder.Property(p => p.SurfaceTemperature)
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
