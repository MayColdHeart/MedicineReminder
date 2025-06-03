using System.Collections.ObjectModel;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MedicineReminder.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace MedicineReminder.Services;

public interface ITokenService
{
    Task<string> GenerateToken(User user);
}

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> _userManager;

    public TokenService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<string> GenerateToken(User user)
    {
        var secret = _configuration["JwtConfig:Secret"] ?? Environment.GetEnvironmentVariable("JWT_SECRET");
        var issuer = _configuration["JwtConfig:ValidIssuer"] ?? Environment.GetEnvironmentVariable("JWT_ISSUER");
        var audience = _configuration["JwtConfig:ValidAudiences"] ?? Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        if(secret is null || issuer is null || audience is null)
        {
            throw new ArgumentNullException("Jwt is not set in the configuration");
        }
        
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        Collection<Claim> claims = [
            new(ClaimTypes.NameIdentifier, user.UserName),
        ];
        
        var userRoles = await _userManager.GetRolesAsync(user);
        foreach (var role in userRoles)
        {
            var roleClaim = new Claim(ClaimTypes.Role, role);
            claims.Add(roleClaim);
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Issuer = issuer,
            Audience = audience,
            Expires = DateTime.UtcNow.AddHours(6),
            SigningCredentials = signingCredentials
        };
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        
        return token;
    }
}