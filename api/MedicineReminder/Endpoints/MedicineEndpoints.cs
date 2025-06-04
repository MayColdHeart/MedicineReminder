using MedicineReminder.Dtos.MedicineDtos;
using MedicineReminder.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MedicineReminder.Endpoints;

public static class MedicineEndpoints
{
    public static void MapMedicineEndpoints(this IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("/medicines");
        
        endpoints.MapGet("/", GetMedicinesList);
        endpoints.MapGet("/{medicineId:int}", GetMedicine);
    }
    
    private static async Task<IResult> GetMedicinesList([FromQuery] int lastId, IMedicineService medicineService)
    {
        var medicinesMainInfo = await medicineService.GetMedicinesListAsync(lastId);
        
        return TypedResults.Ok(medicinesMainInfo);
    }

    private static async Task<Results<Ok<MedicineResponse>, NotFound>> GetMedicine(int medicineId, IMedicineService medicineService)
    {
        var medicine = await medicineService.GetMedicineAsync(medicineId);
        if(medicine is null) return TypedResults.NotFound();
        return TypedResults.Ok(medicine);
    }
}