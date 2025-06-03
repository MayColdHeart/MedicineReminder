namespace MedicineReminder.Endpoints;

public static class RootEndpoints
{
    public static void MapRootEndpoints(this WebApplication app)
    {
        app.MapGet("/", () => "Hello World!");
    }
}