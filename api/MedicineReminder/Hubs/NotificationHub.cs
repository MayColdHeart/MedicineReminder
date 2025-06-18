namespace MedicineReminder.Hubs;

using Microsoft.AspNetCore.SignalR; 

public interface INotificationClient
{
    Task AdminsReceiveNotification(string username, string message, DateTimeOffset alarmTime);
} 

public class NotificationHub : Hub<INotificationClient>
{
    public async Task SendNotification(string username, string message, DateTimeOffset alarmTime)
    {
        // Log the notification
        Console.WriteLine($"Notification sent to {username} at {alarmTime}: {message}");

        // Send the notification to the specific user
        await Clients.All.AdminsReceiveNotification(username, message, alarmTime);
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