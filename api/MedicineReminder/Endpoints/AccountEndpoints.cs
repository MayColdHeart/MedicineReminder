using Microsoft.AspNetCore.Mvc;

namespace MedicineReminder.Endpoints;

public static class AccountEndpoints
{
    public static void MapAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("/accounts");
        
        endpoints.MapGet("/", GetUsersList);
    }

    private static IResult GetUsersList([FromQuery] int lastId)
    {
        return TypedResults.Ok();
    }
}