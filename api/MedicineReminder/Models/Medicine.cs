using MedicineReminder.Dtos.ScheduleDtos;

namespace MedicineReminder.Models;

public class Medicine
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Dosage { get; set; }
    
    public int DosageUnitId { get; set; }
    public int UserId { get; set; }

    public User User { get; set; } = null!;
    public UnitOfMeasurement DosageUnit { get; set; } = null!;
    public List<Schedule> Schedules { get; set; } = [];
}
