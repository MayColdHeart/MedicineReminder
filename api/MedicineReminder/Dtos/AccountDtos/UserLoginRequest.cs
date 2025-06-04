namespace MedicineReminder.Dtos.AccountDtos;

public record UserLoginRequest(
    string Email,
    string Password
);