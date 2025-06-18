namespace MedicineReminder.Hubs;

using Microsoft.AspNetCore.SignalR; 

public interface INotificationClient
{
    Task AdminsReceiveNotification(string username, string message, DateTimeOffset alarmTime);
} 

public class NotificationHub : Hub<INotificationClient>
{
   private readonly ILogger<NotificationHub> _logger;

   public NotificationHub(ILogger<NotificationHub> logger)
   {
       _logger = logger;
   }

    public async Task SendNotification(string username, string message, DateTimeOffset alarmTime)
    {
        // Log the notification
        _logger.LogInformation("Notification sent to {Username} at {DateTimeOffset}: {Message}", username, alarmTime, message);

        // Send the notification to all clients connect to notification hub, (only admins)
        await Clients.All.AdminsReceiveNotification(username, message, alarmTime);
    }

   public override Task OnConnectedAsync()
   {
       _logger.LogInformation("User connected: {ContextUserIdentifier}", Context.UserIdentifier);
       return base.OnConnectedAsync();
   }

   public override Task OnDisconnectedAsync(Exception? exception)
   {
       if (exception != null)
       {
           _logger.LogError(exception, "User disconnected with an error: {ContextUserIdentifier}", Context.UserIdentifier);
       }
       else
       {
           _logger.LogInformation($"User disconnected gracefully: {Context.UserIdentifier}");
       }

       return base.OnDisconnectedAsync(exception);
   }
}