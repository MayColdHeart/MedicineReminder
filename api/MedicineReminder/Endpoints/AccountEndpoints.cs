using Microsoft.AspNetCore.Mvc;

namespace MedicineReminder.Endpoints;

public static class AccountEndpoints
{
    public static void MapAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("/accounts");
    }

    private static IResult GetUsersList([FromQuery] int lastId)
    {
        throw new NotImplementedException();
    }

    private static IResult GetUsersList()
    {
        throw new NotImplementedException();
    }
    
    private static IResult Register()
    {
        throw new NotImplementedException();
    }
    
    private static IResult Login()
    {
        throw new NotImplementedException();
    }

    private static IResult GetUser(string userId)
    {
        throw new NotImplementedException();
    }

    private static IResult DeleteUser(string userId)
    {
        throw new NotImplementedException();
    }
    
    private static IResult UpdateUser(string userId)
    {
        throw new NotImplementedException();
    }
}