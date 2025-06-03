using MedicineReminder.Endpoints;
using MedicineReminder.Startup;

var builder = WebApplication.CreateBuilder(args);

builder.AddDatabase();

builder.AddCustomIdentityCore();
builder.AddJwtAuthentication();
builder.Services.AddCustomAuthorization();

builder.Services.AddScopedServices();

builder.Services.AddOpenApi();

var app = builder.Build();

app.UseOpenApi();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapRootEndpoints();
app.MapAccountEndpoints();
app.MapMedicineEndpoints();

app.Run();