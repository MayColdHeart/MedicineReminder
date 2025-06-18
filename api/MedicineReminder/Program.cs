using MedicineReminder.Endpoints;
using MedicineReminder.Hubs;
using MedicineReminder.Startup;
using MedicineReminder.Startup.OpenApiTransformers;

var builder = WebApplication.CreateBuilder(args);

builder.AddDatabase();

builder.AddCustomIdentityCore();
builder.AddJwtAuthentication();
builder.Services.AddCustomAuthorization();

builder.Services.AddScopedServices();

// TODO: Improve CORS policy for production use
const string _myAllowAllOrigins = "_myAllowAllOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(_myAllowAllOrigins,
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddSignalR(options => {
    options.KeepAliveInterval = TimeSpan.FromSeconds(15);
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
    options.EnableDetailedErrors = true;
    options.StatefulReconnectBufferSize = 200_000; // → bytes. default is 100_000 bytes
});

builder.Services.AddOpenApi(options => options.AddDocumentTransformer<BearerSecuritySchemeTransformer>());

var app = builder.Build();

app.UseDatabase();
app.UseOpenApi();

app.UseHttpsRedirection();

app.UseCors(_myAllowAllOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapRootEndpoints();
app.MapAccountEndpoints();
app.MapHub<NotificationHub>("/notificationHub");
app.MapMedicineEndpoints();

app.Run();