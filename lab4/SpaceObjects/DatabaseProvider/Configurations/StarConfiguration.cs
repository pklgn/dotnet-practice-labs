using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations;

public class StarConfiguration : IEntityTypeConfiguration<Star>
{
    public void Configure(EntityTypeBuilder<Star> builder)
    {
        builder.ToTable("Star").HasKey(p => p.Id);

        builder.Property(s => s.Name)
            .HasMaxLength(32)
            .HasColumnName("Name");
        builder.Property(s => s.Diameter)
            .HasPrecision(10)
            .HasColumnName("Diameter");
        builder.Property(s => s.Mass)
            .HasPrecision(10)
            .HasColumnName("Mass");
        builder.Property(s => s.Magnitude)
            .HasPrecision(10)
            .HasColumnName("Magnitude");
        builder.Property(s => s.Temperature)
            .HasPrecision(2)
            .HasColumnName("Temperature");
        builder.Property(s => s.DiscoveryDate)
            .HasColumnName("DiscoveryDate");

        builder
            .HasOne(s => s.StarType)
            .WithMany(st => st.Stars)
            .HasForeignKey(p => p.StarTypeId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
