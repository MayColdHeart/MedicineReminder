using System.Reflection;
using MedicineReminder.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MedicineReminder.Data;

public class AppDbContext : IdentityDbContext
{
    public AppDbContext(DbContextOptions <AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<User> User { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}