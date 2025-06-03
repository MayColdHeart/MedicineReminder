namespace MedicineReminder.Dtos.MedicineDtos;

public record MedicineMainInfoResponse(
    string Name,
    int Dosage,
    string DosageUnit
);