using Microsoft.AspNetCore.Identity;

namespace MedicineReminder.Models;

public class User : IdentityUser
{
    public DateTimeOffset CreatedAt { get; set; }
    public string Photo { get; set; } = string.Empty;

    public ICollection<Medicine> Medicines { get; } = [];
}