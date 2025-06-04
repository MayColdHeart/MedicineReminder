using Scalar.AspNetCore;

namespace MedicineReminder.Startup;

public static class OpenApiConfig
{
    public static void UseOpenApi(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference(options =>
            {
                options.Title = "Medicine Reminder API";
                options.Theme = ScalarTheme.Saturn;
                options.DarkMode = true;
                options.DefaultHttpClient = KeyValuePair.Create(ScalarTarget.JavaScript, ScalarClient.Fetch);
            });
        }
    }
}