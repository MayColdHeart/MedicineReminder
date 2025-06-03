namespace MedicineReminder.Models;

public class Medicine
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Dosage { get; set; }
    
    public int DosageUnitId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public int ScheduleId { get; set; }

    public User User { get; set; } = null!;
    public UnitOfMeasurement DosageUnit { get; set; } = null!;
    public ICollection<Schedule> Schedules { get; } = [];
}
