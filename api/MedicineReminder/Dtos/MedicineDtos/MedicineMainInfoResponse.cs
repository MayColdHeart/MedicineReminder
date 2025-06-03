namespace MedicineReminder.Dtos.MedicineDtos;

public record MedicineMainInfoResponse(
    int Id,
    string Name,
    int Dosage,
    string DosageUnit
);