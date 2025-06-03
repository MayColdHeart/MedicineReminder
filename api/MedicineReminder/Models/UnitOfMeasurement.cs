namespace MedicineReminder.Models;

public class UnitOfMeasurement
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public ICollection<Medicine> Medicines { get; } = [];
}