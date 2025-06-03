using MedicineReminder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicineReminder.Data;

public class UnitOfMeasurementConfig : IEntityTypeConfiguration<UnitOfMeasurement>
{
    public void Configure(EntityTypeBuilder<UnitOfMeasurement> builder)
    {
        builder.ToTable("UnitOfMeasurement");
        builder.HasKey(uom => uom.Id);
        
        builder.Property(uom => uom.Name).HasMaxLength(100);
    }
}