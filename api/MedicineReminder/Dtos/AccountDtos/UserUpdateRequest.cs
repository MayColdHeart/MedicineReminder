namespace MedicineReminder.Dtos.AccountDtos;

public record UserUpdateRequest(
    string UserName,
    string Email,
    string PhoneNumber,
    string? CurrentPassword = null, 
    string? NewPassword = null
);