namespace MedicineReminder.Dtos.AccountDtos;

public record UserResponse(
    string UserName,
    string Email,
    string PhoneNumber,
    DateTimeOffset CreatedAt,
    string Photo
);