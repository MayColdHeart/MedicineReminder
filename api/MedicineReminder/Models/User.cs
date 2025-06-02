using Microsoft.AspNetCore.Identity;

namespace MedicineReminder.Models;

public class User : IdentityUser
{
    public string Photo { get; set; } = string.Empty;
}