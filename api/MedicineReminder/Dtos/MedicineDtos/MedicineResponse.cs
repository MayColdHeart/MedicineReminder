using MedicineReminder.Dtos.ScheduleDtos;

namespace MedicineReminder.Dtos.MedicineDtos;

public record MedicineResponse(
    string Name,
    int Dosage,
    string DosageUnit,
    IReadOnlyCollection<ScheduleResponse> Schedules
);