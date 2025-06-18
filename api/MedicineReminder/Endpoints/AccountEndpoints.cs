using System.Security.Claims;
using MedicineReminder.Dtos.AccountDtos;
using MedicineReminder.Dtos.EndpointDtos;
using MedicineReminder.Hubs;
using MedicineReminder.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.SignalR;

namespace MedicineReminder.Endpoints;

public static class AccountEndpoints
{
    public static void MapAccountEndpoints(this IEndpointRouteBuilder app)
    {
        var endpoints = app.MapGroup("/accounts");

        endpoints.MapPost("/register", Register);
        endpoints.MapPost("/login", Login);
        endpoints.MapGet("/", GetUsersList);
        endpoints.MapGet("/{username}", GetUser)
            .RequireAuthorization();
        endpoints.MapPut("/{username}", UpdateUser)
            .RequireAuthorization();
        endpoints.MapDelete("/{username}", DeleteUser)
            .RequireAuthorization();
        endpoints.MapPost("/notify", NotifyAdmin);
    }

    private static async Task<Results<Ok<TokenResponse>, BadRequest<MessageResponse>>> Register(UserRegisterRequest userRegister, IAccountService accountService)
    {
        try
        {
            var token = await accountService.RegisterAsync(userRegister);
            return TypedResults.Ok(new TokenResponse(token));
        }
        catch (AuthenticationFailureException ex)
        {
            return TypedResults.BadRequest(new MessageResponse(ex.Message));
        }
    }

    private static async Task<Results<Ok<TokenResponse>, BadRequest<MessageResponse>>> Login(UserLoginRequest userRegister, IAccountService accountService)
    {
        try
        {
            var token = await accountService.LoginAsync(userRegister);
            return TypedResults.Ok(new TokenResponse(token));
        }
        catch (AuthenticationFailureException ex)
        {
            return TypedResults.BadRequest(new MessageResponse(ex.Message));
        }
    }

    private static async Task<Ok<IList<UserMainInfoResponse>>> GetUsersList(IAccountService accountService)
    {
        var usersMainInfoList = await accountService.GetUsersListAsync();
        return TypedResults.Ok(usersMainInfoList);
    }

    private static async Task<Results<Ok<UserResponse>, NotFound>> GetUser(string username, IAccountService accountService)
    {
        var userResponse = await accountService.GetUserAsync(username);

        if (userResponse is null) return TypedResults.NotFound();

        return TypedResults.Ok(userResponse);
    }

    private static async Task<Results<Ok<MessageResponse>, BadRequest<MessageResponse>>> DeleteUser(string username, IAccountService accountService)
    {
        bool userDeleted = await accountService.DeleteUserAsync(username);

        if (userDeleted) return TypedResults.Ok(new MessageResponse("User deleted"));
        return TypedResults.BadRequest(new MessageResponse("Unable to delete user."));
    }

    private static async Task<Results<Ok<UserResponse>, BadRequest<MessageResponse>>> UpdateUser(UserUpdateRequest userUpdateRequest, IAccountService accountService)
    {
        var userResponse = await accountService.UpdateUserAsync(userUpdateRequest);

        if (userResponse is null) return TypedResults.BadRequest(new MessageResponse("Unable to update user."));

        return TypedResults.Ok(userResponse);
    }

    private static async Task<IResult> NotifyAdmin(
        NotifyRequest notifyRequest,
        IHubContext<NotificationHub, INotificationClient> hubContext,
        HttpContext httpContext
    )
    {
        var username = httpContext.User.FindFirstValue(ClaimTypes.Name);
        if(username is null)
        {
            return TypedResults.BadRequest("Unable to find logged user");
        } 
        
        await hubContext.Clients.All.AdminsReceiveNotification(username, notifyRequest.Message, notifyRequest.AlarmTime);
        // Log the notification
        Console.WriteLine($"THIS IS FROM ENDPOINT: Notification sent from {username} at {notifyRequest.AlarmTime}: {notifyRequest.Message}");
        return TypedResults.Ok(new MessageResponse("Notification sent to admin."));
    }
}