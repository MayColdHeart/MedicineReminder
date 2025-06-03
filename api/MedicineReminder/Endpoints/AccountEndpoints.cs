namespace MedicineReminder.Endpoints;

public static class AccountEndpoints
{
    public static void MapAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("/accounts");
        
        endpoints.MapGet("/", () => "Hello, this is account root endpoint");
    }
}