namespace MedicineReminder.Hubs;

using MedicineReminder.Services;
using Microsoft.AspNetCore.SignalR; 

public interface INotificationClient
{
    Task ReceiveNotification(string message);
} 

public class NotificationHub : Hub<INotificationClient>
{

    public async Task SendNotification(string userId, string message)
    {
        await Clients.User(userId).ReceiveNotification(message);
    }

    public override Task OnConnectedAsync()
    {
        Console.WriteLine($"User connected: {Context.UserIdentifier}");
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"User disconnected: {Context.UserIdentifier}");
        return base.OnDisconnectedAsync(exception);
    }
}