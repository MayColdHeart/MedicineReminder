using MedicineReminder.Dtos.ScheduleDtos;

namespace MedicineReminder.Dtos.MedicineDtos;

public record UpdateMedicineRequest(
    string Name,
    int Dosage,
    string DosageUnit,
    IReadOnlyCollection<UpdateScheduleRequest> Schedules
);