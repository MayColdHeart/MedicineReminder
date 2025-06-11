using Scalar.AspNetCore;

namespace MedicineReminder.Startup;

public static class OpenApiConfig
{
    public static void UseOpenApi(this WebApplication app)
    {
        // TODO: Remove from production environment
        if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
        {
            app.MapOpenApi();
            app.MapScalarApiReference(options =>
            {
                options.Title = "Medicine Reminder API";
                options.Theme = ScalarTheme.Saturn;
                options.DarkMode = true;
                options.DefaultHttpClient = KeyValuePair.Create(ScalarTarget.JavaScript, ScalarClient.Axios);
            });
        }
    }
}