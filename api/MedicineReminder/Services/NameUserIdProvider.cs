using Microsoft.AspNetCore.SignalR;

namespace MedicineReminder.Services;

public class NameUserIdProvider : IUserIdProvider
{
    // TODO: Implement user ID provider for SignalR
    public string? GetUserId(HubConnectionContext connection)
    {
        return connection.User?.Identity?.Name;
    }
}