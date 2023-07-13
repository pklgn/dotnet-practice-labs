using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatabaseProvider.Configurations;

public class StarHasAbsoluteMagnitudeConfiguration : IEntityTypeConfiguration<StarHasAbsoluteMagnitude>
{
    public void Configure(EntityTypeBuilder<StarHasAbsoluteMagnitude> builder)
    {
        builder.ToTable("StarHasAbsoluteMagnitude").HasKey(pt => pt.Id);

        builder.Property(s => s.AbsoluteMagnitude)
            .HasColumnName("AbsoluteMagnitude");
        builder.Property(s => s.StartDate)
            .HasColumnName("StartDate");
        builder.Property(s => s.EndDate)
            .HasColumnName("EndDate");

        builder
            .HasOne(s => s.Star)
            .WithMany(s => s.AbsoluteMagnitudes)
            .HasForeignKey(s => s.StarId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
