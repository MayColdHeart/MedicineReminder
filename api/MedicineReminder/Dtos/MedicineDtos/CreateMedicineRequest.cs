using System.Collections.ObjectModel;
using MedicineReminder.Dtos.ScheduleDtos;

namespace MedicineReminder.Dtos.MedicineDtos;

public record CreateMedicineRequest(
    string Name,
    int Dosage,
    string DosageUnit,
    IReadOnlyCollection<CreateScheduleRequest> Schedules
);