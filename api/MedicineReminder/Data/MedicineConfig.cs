using MedicineReminder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicineReminder.Data;

public class MedicineConfig : IEntityTypeConfiguration<Medicine>
{
    public void Configure(EntityTypeBuilder<Medicine> builder)
    {
        builder.ToTable("Medicine");
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Name).HasMaxLength(400);
        builder.Property(m => m.Dosage);
        builder.Property(m => m.UserId).HasMaxLength(450);
        
        builder.HasOne(m => m.User)
            .WithMany(u => u.Medicines)
            .HasForeignKey(m => m.UserId);        
        builder.HasOne(m => m.DosageUnit)
            .WithMany(u => u.Medicines)
            .HasForeignKey(m => m.DosageUnitId);
    }
}