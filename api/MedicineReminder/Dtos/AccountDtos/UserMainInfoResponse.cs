namespace MedicineReminder.Dtos.AccountDtos;

public record UserMainInfoResponse(
    string UserName,
    string Photo,
    DateTimeOffset CreatedAt
);