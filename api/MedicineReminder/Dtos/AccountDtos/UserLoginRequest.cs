namespace MedicineReminder.Dtos.AccountDtos;

public record UserLoginRequest(
    string UserName,
    string Password
);