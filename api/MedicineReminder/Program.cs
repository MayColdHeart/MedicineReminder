using MedicineReminder.Endpoints;
using MedicineReminder.Startup;
using MedicineReminder.Startup.OpenApiTransformers;

var builder = WebApplication.CreateBuilder(args);

builder.AddDatabase();

builder.AddCustomIdentityCore();
builder.AddJwtAuthentication();
builder.Services.AddCustomAuthorization();

builder.Services.AddScopedServices();

builder.Services.AddOpenApi(options => options.AddDocumentTransformer<BearerSecuritySchemeTransformer>());

var app = builder.Build();

app.UseDatabase();
app.UseOpenApi();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapRootEndpoints();
app.MapAccountEndpoints();
app.MapMedicineEndpoints();

app.Run();