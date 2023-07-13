using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations;

public class StarTypeConfiguration : IEntityTypeConfiguration<StarType>
{
    public void Configure(EntityTypeBuilder<StarType> builder)
    {
        builder.ToTable("StarType").HasKey(pt => pt.Id);

        builder.Property(s => s.Name)
            .HasMaxLength(32)
            .HasColumnName("Name");
    }
}
