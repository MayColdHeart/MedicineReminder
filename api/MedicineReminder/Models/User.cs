using Microsoft.AspNetCore.Identity;

namespace MedicineReminder.Models;

public class User : IdentityUser
{
    public override string UserName { get; set; }
    public override string Email { get; set; }
    public override string PhoneNumber { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public string Photo { get; set; } = string.Empty;

    public ICollection<Medicine> Medicines { get; } = [];
}