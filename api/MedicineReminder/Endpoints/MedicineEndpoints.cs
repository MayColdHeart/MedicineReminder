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
    
    private static async Task<IResult> GetMedicinesList([FromQuery] int lastId, IMedicineServices medicineServices)
    {
        var medicinesMainInfo = await medicineServices.GetMedicinesListAsync(lastId);
        
        return TypedResults.Ok(medicinesMainInfo);
    }

    private static async Task<Results<Ok<MedicineResponse>, NotFound>> GetMedicine(int medicineId, IMedicineServices medicineServices)
    {
        var medicine = await medicineServices.GetMedicineAsync(medicineId);
        if(medicine is null) return TypedResults.NotFound();
        return TypedResults.Ok(medicine);
    }
}