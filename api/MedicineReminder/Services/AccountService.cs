using MedicineReminder.Data;
using MedicineReminder.Dtos.AccountDtos;
using MedicineReminder.Mappers;
using MedicineReminder.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MedicineReminder.Services;

public interface IAccountService
{
    Task<IList<UserMainInfoResponse>> GetUsersListAsync(string? lastId);
    Task<string> RegisterAsync(UserRegisterRequest userRegisterRequest);
    Task<string> LoginAsync(UserLoginRequest userLoginRequest);
    Task<UserResponse> GetUserAsync(string userId);
    Task<bool> DeleteUserAsync(string userId);
    Task<UserResponse> UpdateUserAsync(string userId);
}

// TODO: implement authentication
public class AccountService : IAccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly AppDbContext _dbContext;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    
    public AccountService (ILogger<AccountService> logger, AppDbContext dbContext, UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _logger = logger;
        _dbContext = dbContext;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<IList<UserMainInfoResponse>> GetUsersListAsync(string? lastId = null)
    {
        // TODO: Add pagination
        var userMainInfoList = await _dbContext.User
            .OrderByDescending(u => u.CreatedAt)
            .ThenBy(u => u.Id)
            .Select(u => u.ToUserMainInfoResponse())
            .ToListAsync();

        return userMainInfoList;
    }

    public Task<string> RegisterAsync(UserRegisterRequest userRegisterRequest)
    {
        throw new NotImplementedException();
    }

    public Task<string> LoginAsync(UserLoginRequest userLoginRequest)
    {
        throw new NotImplementedException();
    }

    public Task<UserResponse> GetUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteUserAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<UserResponse> UpdateUserAsync(string userId)
    {
        throw new NotImplementedException();
    }
}