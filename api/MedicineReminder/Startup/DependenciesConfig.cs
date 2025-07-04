using System.Text;
using MedicineReminder.Data;
using MedicineReminder.Models;
using MedicineReminder.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;

namespace MedicineReminder.Startup;

public static class DependenciesConfig
{
    public static void AddScopedServices(this IServiceCollection services)
    {
        services.AddScoped<IMedicineService, MedicineService>();
        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<ITokenService, TokenService>();
    }
    
    public static void AddSingletonServices(this IServiceCollection services)
    {
        services.AddSingleton<IUserIdProvider, NameUserIdProvider>();
    }
    
    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? Environment.GetEnvironmentVariable("MSSQL_CONNECTION_STRING");
        builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
    }
    
    public static void AddCustomIdentityCore(this WebApplicationBuilder builder)
    {
        builder.Services.AddIdentityCore<User>()
            .AddRoles<IdentityRole<int>>()
            .AddSignInManager<SignInManager<User>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();
        
        builder.Services.Configure<IdentityOptions>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequiredLength = 4;
            options.Password.RequiredUniqueChars = 1;
        });
    }

    public static void AddJwtAuthentication(this WebApplicationBuilder builder)
    {
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            var secret = builder.Configuration["JwtConfig:Secret"] ?? Environment.GetEnvironmentVariable("JWT_SECRET");
            var issuer = builder.Configuration["JwtConfig:ValidIssuer"] ?? Environment.GetEnvironmentVariable("JWT_ISSUER");
            var audience = builder.Configuration["JwtConfig:ValidAudiences"] ?? Environment.GetEnvironmentVariable("JWT_AUDIENCE");

            if (secret is null || issuer is null || audience is null)
            {
                throw new ApplicationException("Jwt is not set in the configuration");
            }

            options.RequireHttpsMetadata = false; // TODO: change back to true in deploy
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidAudience = audience,
                ValidIssuer = issuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
            };
            
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    StringValues accessToken = context.HttpContext.Request.Query["access_token"];
                    PathString path = context.HttpContext.Request.Path;

                    if(!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/notification-hub"))
                    {
                        context.Token = accessToken;
                    }
                    return Task.CompletedTask;
                }
            };
        });
    }
    
    public static void AddCustomAuthorization(this IServiceCollection services)
    {
        // TODO: add policy based authorization
        services.AddAuthorization();
    }
}