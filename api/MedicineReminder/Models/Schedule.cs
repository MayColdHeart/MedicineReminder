namespace MedicineReminder.Models;

public class Schedule
{
    public int Id { get; set; }
    public DateTimeOffset Hour { get; set; }
    public bool IsTaken { get; set; }
    
    public int MedicineId { get; set; }

    public Medicine Medicine { get; set; } = null!;
}