namespace MedicineReminder.Endpoints;

public static class MedicineEndpoints
{
    public static void MapMedicineEndpoints(this IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("/medicine");
        
        endpoints.MapGet("/", () => "Hello, this is medicine root endpoint");
    }

    // TODO: IResult vs Results<Ok>
    private static IResult GetAllMedicines()
    {
        return TypedResults.Ok();
    }

    private static IResult GetMedicine(string id)
    {
        return TypedResults.Ok();
    }
}