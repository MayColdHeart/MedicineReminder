using System.Reflection;
using MedicineReminder.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MedicineReminder.Data;

public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public AppDbContext(DbContextOptions <AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<User> User { get; set; }
    public DbSet<Medicine> Medicine { get; set; }
    public DbSet<Schedule> Schedule { get; set; }
    public DbSet<UnitOfMeasurement> UnitOfMeasurement { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}