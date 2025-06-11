using System.Threading.Tasks;
using MedicineReminder.Constants;
using MedicineReminder.Data;
using MedicineReminder.Models;
using Microsoft.AspNetCore.Identity;
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

            if (!dbContext.User.Any())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();
                SeedDatabase(dbContext, userManager, roleManager).Wait();
            }
        }
    }

    private static async Task SeedDatabase(AppDbContext dbContext, UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager)
    {
        // Seed roles
        var adminRole = await roleManager.FindByNameAsync(RoleConstants.Admin);
        if (adminRole is null)
        {
            await roleManager.CreateAsync(new IdentityRole<int>(RoleConstants.Admin));
        }

        var userRole = await roleManager.FindByNameAsync(RoleConstants.User);
        if (userRole is null)
        {
            await roleManager.CreateAsync(new IdentityRole<int>(RoleConstants.User));
        }


        const string testPassword = "1234";

        List<User> users = [
            new()
            {
                FirstName = "Marcos",
                LastName = "Nunes",
                UserName = "marcos-nunes",
                Email = "marcos@email.com",
                PhoneNumber = "11999999999",
                Photo = "https://images.pexels.com/photos/31630200/pexels-photo-31630200/free-photo-of-gato-preto-e-branco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new()
            {
                FirstName = "Ana",
                LastName = "Silva",
                UserName = "ana-silva",
                Email = "ana.silva@email.com",
                PhoneNumber = "61999999999",
                Photo = "https://images.pexels.com/photos/731564/pexels-photo-731564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new()
            {
                FirstName = "João",
                LastName = "Ferreira",
                UserName = "joao-ferreira",
                Email = "joao.ferreira@email.com",
                PhoneNumber = "61999999999",
                Photo = "https://images.pexels.com/photos/31644561/pexels-photo-31644561/free-photo-of-luzes-a-noite-no-japao.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new()
            {
                FirstName = "Beatriz",
                LastName = "Rocha",
                UserName = "beatriz-rocha",
                Email = "beatriz.rocha@email.com",
                PhoneNumber = "61999999999",
                Photo = "https://images.pexels.com/photos/31613570/pexels-photo-31613570/free-photo-of-retrato-caprichoso-em-um-campo-de-flores-encantador.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new()
            {
                FirstName = "Lucas",
                LastName = "Mendes",
                UserName = "lucas-mendes",
                Email = "lucas.mendes@email.com",
                PhoneNumber = "61999999999",
                Photo = "https://images.pexels.com/photos/31615928/pexels-photo-31615928/free-photo-of-andar-de.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new()
            {
                FirstName = "Carla",
                LastName = "Almeida",
                UserName = "carla-almeida",
                Email = "carla.almeida@email.com",
                PhoneNumber = "61999999999",
                Photo = "https://images.pexels.com/photos/31612073/pexels-photo-31612073/free-photo-of-idoso-aproveita-vista-da-praia-com-bicicleta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
            new()
            {
                FirstName = "admin",
                LastName = "admin",
                UserName = "admin",
                Email = "admin@email.com",
                PhoneNumber = "61999999999",
                Photo = "https://images.pexels.com/photos/6424585/pexels-photo-6424585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }
        ];

        var units = new List<UnitOfMeasurement>
        {
            new UnitOfMeasurement { Name = "ml"},
            new UnitOfMeasurement { Name = "mg"},
            new UnitOfMeasurement { Name = "g"},
            new UnitOfMeasurement { Name = "l"},
        };
        
        var dateNow = DateTimeOffset.UtcNow;
        var medicines = new List<Medicine>
        {
            new() {
                UserId = 4,
                Name = "Dipirona",
                Dosage = 7,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow, IsTaken = true },
                    new() { Hour = dateNow.AddHours(18), IsTaken = false }
                }
            },
            new() {
                UserId = 1,
                Name = "Amoxicilina", 
                Dosage = 8,
                DosageUnitId = 1,
                Schedules = new List<Schedule> 
                {
                    new() { Hour = dateNow.AddDays(30), IsTaken = false }
                }
            },
            new() {
                UserId = 6,
                Name = "Paracetamol",
                Dosage = 30,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow, IsTaken = false },
                    new() { Hour = dateNow.AddMonths(10), IsTaken = true },
                    new() { Hour = dateNow.AddHours(8), IsTaken = false }
                }
            },
            new() {
                UserId = 2,
                Name = "Ibuprofeno",
                Dosage = 400,
                DosageUnitId = 1, 
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddHours(6), IsTaken = false },
                    new() { Hour = dateNow.AddHours(12), IsTaken = false }
                }
            },
            new() {
                UserId = 5,
                Name = "Omeprazol",
                Dosage = 20,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddDays(1), IsTaken = false },
                    new() { Hour = dateNow.AddDays(2), IsTaken = false },
                    new() { Hour = dateNow.AddDays(3), IsTaken = false }
                }
            },
            new() {
                UserId = 3,
                Name = "Vitamina C",
                Dosage = 1000,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddMonths(1), IsTaken = false }
                }
            },
            new() {
                UserId = 1,
                Name = "Loratadina",
                Dosage = 10, 
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddHours(24), IsTaken = false },
                    new() { Hour = dateNow.AddHours(48), IsTaken = false },
                    new() { Hour = dateNow.AddHours(72), IsTaken = false },
                    new() { Hour = dateNow.AddHours(96), IsTaken = false }
                }
            },
            new() {
                UserId = 4,
                Name = "Metformina",
                Dosage = 500,
                DosageUnitId = 1, 
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddDays(7), IsTaken = false },
                    new() { Hour = dateNow.AddDays(14), IsTaken = false },
                    new() { Hour = dateNow.AddDays(21), IsTaken = false },
                    new() { Hour = dateNow.AddDays(28), IsTaken = false },
                    new() { Hour = dateNow.AddDays(35), IsTaken = false }
                }
            },
            new() {
                UserId = 2,
                Name = "Sertralina",
                Dosage = 50,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddMonths(2), IsTaken = false },
                    new() { Hour = dateNow.AddMonths(3), IsTaken = false }
                }
            },
            new() {
                UserId = 6,
                Name = "Atenolol",
                Dosage = 25,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddHours(4), IsTaken = false },
                    new() { Hour = dateNow.AddHours(8), IsTaken = false },
                    new() { Hour = dateNow.AddHours(12), IsTaken = false }
                }
            },
            new() {
                UserId = 5,
                Name = "Complexo B",
                Dosage = 1,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddDays(1), IsTaken = false },
                    new() { Hour = dateNow.AddDays(2), IsTaken = false }
                }
            },
            new() {
                UserId = 3,
                Name = "Ranitidina",
                Dosage = 150,
                DosageUnitId = 1,
                Schedules = new List<Schedule>
                {
                    new() { Hour = dateNow.AddHours(2), IsTaken = false },
                    new() { Hour = dateNow.AddHours(4), IsTaken = false },
                    new() { Hour = dateNow.AddHours(6), IsTaken = false },
                    new() { Hour = dateNow.AddHours(8), IsTaken = false }
                }
            }
        };

        var transaction = dbContext.Database.BeginTransaction();

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, testPassword);
            await userManager.AddToRoleAsync(user, RoleConstants.User);

            if (user.UserName == "admin")
            {
                await userManager.AddToRoleAsync(user, RoleConstants.Admin);
            }
        }
        
        dbContext.UnitOfMeasurement.AddRange(units);
        dbContext.SaveChanges();
        dbContext.Medicine.AddRange(medicines);
        dbContext.SaveChanges();
        
        transaction.Commit();
    }
}