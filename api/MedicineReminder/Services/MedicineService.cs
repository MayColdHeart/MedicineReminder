using MedicineReminder.Data;
using MedicineReminder.Dtos.MedicineDtos;
using MedicineReminder.Mappers;
using Microsoft.EntityFrameworkCore;

namespace MedicineReminder.Services;

public interface IMedicineService
{
    Task<List<MedicineMainInfoResponse>> GetMedicinesListAsync(int lastId);
    Task<MedicineResponse?> GetMedicineAsync(int medicineId);
    Task<MedicineResponse> CreateMedicineAsync(CreateMedicineRequest medicineRequest);
    Task<MedicineResponse?> UpdateMedicineAsync(int medicineId, UpdateMedicineRequest updateMedicineRequest);
    Task<bool> DeleteMedicineAsync(int medicineId);
}

public class MedicineService : IMedicineService
{
    private readonly AppDbContext _dbContext;
    private readonly ILogger<MedicineService> _logger;
    
    public MedicineService(AppDbContext dbContext, ILogger<MedicineService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<List<MedicineMainInfoResponse>> GetMedicinesListAsync(int lastId)
    {
        int pageSize = 20;
        
        var medicineMainInfoResponses = await _dbContext.Medicine
            .OrderByDescending(m => m.Id)
            .Where(m => m.Id > lastId)
            .Take(pageSize)
            .Select(MedicineMappers.ProjectToMedicineMainInfoResponse)
            .ToListAsync();
        
        _logger.LogInformation("Medicines list with {Count} items was requested", medicineMainInfoResponses.Count);
        return medicineMainInfoResponses;
    }

    public async Task<MedicineResponse?> GetMedicineAsync(int medicineId)
    {
        _logger.LogInformation("Medicine with Id {Id} requested", medicineId);
        var medicineModel = await _dbContext.Medicine
            .FirstOrDefaultAsync(m => m.Id == medicineId);
        if (medicineModel is null) return null;
        
        var medicineResponse =  medicineModel.ToMedicineResponse();
        _logger.LogInformation("Medicine with Id {Id} sent", medicineId);
        return medicineResponse;
    }

    public async Task<MedicineResponse> CreateMedicineAsync(CreateMedicineRequest createMedicineRequest)
    {
        var medicineModel = createMedicineRequest.ToMedicineModel();
        _dbContext.Medicine.Add(medicineModel);
        await _dbContext.SaveChangesAsync();
        _logger.LogInformation("Medicine with Id {Id} created", medicineModel.Id);
        
        var medicineResponse = medicineModel.ToMedicineResponse();
        return medicineResponse;
    }

    public async Task<MedicineResponse?> UpdateMedicineAsync(int medicineId, UpdateMedicineRequest updateMedicineRequest)
    {
        var medicineToUpdateModel = _dbContext.Medicine.FirstOrDefault(m => m.Id == medicineId);
        if (medicineToUpdateModel is null) return null;
        
        _dbContext.Entry(medicineToUpdateModel).CurrentValues.SetValues(updateMedicineRequest);
        await _dbContext.SaveChangesAsync();
        
        _logger.LogInformation("Medicine with Id {Id} updated", medicineId);
        var medicineResponse = medicineToUpdateModel.ToMedicineResponse();
        return medicineResponse;
    }

    public async Task<bool> DeleteMedicineAsync(int medicineId)
    {
        var medicineToDeleteModel = _dbContext.Medicine.FirstOrDefault(m => m.Id == medicineId);
        if (medicineToDeleteModel is null) return false;
        
        _dbContext.Medicine.Remove(medicineToDeleteModel);
        await _dbContext.SaveChangesAsync();
        _logger.LogInformation("Medicine with Id {Id} deleted", medicineId);
        
        return true;
    }
}