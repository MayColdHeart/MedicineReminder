namespace MedicineReminder.Dtos.AccountDtos;

public record UserRegisterRequest(
    string UserName,
    string Email,
    string PhoneNumber
);