using MedicineReminder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicineReminder.Data;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("User");

        builder.Property(u => u.UserName)
            .HasMaxLength(256)
            .IsRequired();
        builder.Property(u => u.Email)
            .HasMaxLength(254)
            .IsRequired();
        builder.Property(u => u.PhoneNumber).IsRequired();
        builder.Property(u => u.Photo).HasColumnType("varchar(600)");
        builder.Property(u => u.CreatedAt);
    }
}