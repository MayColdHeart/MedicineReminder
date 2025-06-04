using MedicineReminder.Data;
using Microsoft.EntityFrameworkCore;

namespace MedicineReminder.Startup;

public static class DatabaseStartUp
{
    public static void UseDatabase(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            using var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            dbContext.Database.Migrate();
        }
    }
}