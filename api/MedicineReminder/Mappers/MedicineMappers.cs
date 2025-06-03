using System.Linq.Expressions;
using MedicineReminder.Dtos.MedicineDtos;
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
            Id: medicineModel.Id, 
            Name: medicineModel.Name, 
            Dosage: medicineModel.Dosage, 
            DosageUnit: medicineModel.DosageUnit.Name
        );
    }

    public static readonly Expression<Func<Medicine, MedicineMainInfoResponse>> ProjectToMedicineMainInfoResponse = (medicineModel) =>
    new MedicineMainInfoResponse
    (
        medicineModel.Id,
        medicineModel.Name,
        medicineModel.Dosage,
        medicineModel.DosageUnit.Name
    );

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