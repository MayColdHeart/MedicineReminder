using MedicineReminder.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MedicineReminder.Data;

public class ScheduleConfig : IEntityTypeConfiguration<Schedule>
{
    public void Configure(EntityTypeBuilder<Schedule> builder)
    {
        builder.ToTable("Schedule");
        builder.HasKey(s => s.Id);

        builder.Property(s => s.IsTaken);
        builder.Property(s => s.Hour);

        builder.HasOne(s => s.Medicine)
            .WithMany(m => m.Schedules)
            .HasForeignKey(s => s.MedicineId);
    }
}