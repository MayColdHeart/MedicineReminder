namespace MedicineReminder.Dtos.AccountDtos;

public record UpdateUserRequest(
    string UserName,
    string Email,
    string PhoneNumber,
    string? CurrentPassword = null, 
    string? NewPassword = null
);