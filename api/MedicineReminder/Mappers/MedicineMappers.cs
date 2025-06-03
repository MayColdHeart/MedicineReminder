using System.Collections.ObjectModel;
using MedicineReminder.Dtos.MedicineDtos;
using MedicineReminder.Dtos.ScheduleDtos;
using MedicineReminder.Models;

namespace MedicineReminder.Mappers;

public static class MedicineMappers
{
    // Dtos to Models
    public static Medicine ToMedicineModel(this CreateMedicineRequest createMedicineRequest)
    {
        return new Medicine
        {
            Name = createMedicineRequest.Name,
            Dosage = createMedicineRequest.Dosage,
        };
    }
    
    public static Medicine ToMedicineModel(this UpdateMedicineRequest createMedicineRequest)
    {
        return new Medicine
        {
            Name = createMedicineRequest.Name,
            Dosage = createMedicineRequest.Dosage,
        };
    }
    
    // Models to Dtos
    public static MedicineMainInfoResponse ToMedicineMainInfoResponse(this Medicine medicineModel)
    {
        return new MedicineMainInfoResponse
        (
           Name: medicineModel.Name,
           Dosage: medicineModel.Dosage,
           DosageUnit: medicineModel.DosageUnit.Name
        );
    }

    public static MedicineResponse ToMedicineResponse(this Medicine medicineModel)
    {
        return new MedicineResponse(
            Name: medicineModel.Name,
            Dosage: medicineModel.Dosage,
            DosageUnit: medicineModel.DosageUnit.Name,
            Schedules: medicineModel.Schedules
                .Select(m => m.ToScheduleResponse())
                .ToList()
                .AsReadOnly()
        );
    }
}