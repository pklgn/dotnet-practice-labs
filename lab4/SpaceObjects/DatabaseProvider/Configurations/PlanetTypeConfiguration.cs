using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations;

public class PlanetTypeConfiguration : IEntityTypeConfiguration<PlanetType>
{
    public void Configure(EntityTypeBuilder<PlanetType> builder)
    {
        builder.ToTable("PlanetType").HasKey(pt => pt.Id);

        builder.Property(s => s.Name)
            .HasMaxLength(32)
            .HasColumnName("Name");
        builder.Property(s => s.Description)
            .HasMaxLength(256)
            .HasColumnName("Description");
    }
}
