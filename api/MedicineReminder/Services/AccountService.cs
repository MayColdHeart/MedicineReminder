using MedicineReminder.Data;
using MedicineReminder.Dtos.AccountDtos;
using MedicineReminder.Mappers;
using MedicineReminder.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MedicineReminder.Services;

public interface IAccountService
{
    Task<IList<UserMainInfoResponse>> GetUsersListAsync(string? lastId = null);
    Task<string> RegisterAsync(UserRegisterRequest userRegisterRequest);
    Task<string> LoginAsync(UserLoginRequest userLoginRequest);
    Task<UserResponse?> GetUserAsync(string username);
    Task<bool> DeleteUserAsync(string username);
    Task<UserResponse?> UpdateUserAsync(UserUpdateRequest userUpdateRequest);
}

// TODO: implement authentication
public class AccountService : IAccountService
{
    private readonly ILogger<AccountService> _logger;
    private readonly AppDbContext _dbContext;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ITokenService _tokenService;
    
    public AccountService (
        ILogger<AccountService> logger, 
        AppDbContext dbContext, 
        UserManager<User> userManager, 
        SignInManager<User> signInManager, 
        ITokenService tokenService
    )
    {
        _logger = logger;
        _dbContext = dbContext;
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    public async Task<IList<UserMainInfoResponse>> GetUsersListAsync(string? lastId = null)
    {
        // TODO: Add pagination
        var userMainInfoList = await _dbContext.User
            .OrderByDescending(u => u.Id)
            .Select(u => u.ToUserMainInfoResponse())
            .ToListAsync();

        return userMainInfoList;
    }

    public async Task<string> RegisterAsync(UserRegisterRequest userRegisterRequest)
    {
        var newUser = userRegisterRequest.ToUserModel();
        newUser.CreatedAt = DateTimeOffset.Now;
        
        var result = await _userManager.CreateAsync(newUser, userRegisterRequest.Password);
        if (!result.Succeeded)
        {
            throw new AuthenticationFailureException(result.Errors.First().Description);
        }
        _logger.LogInformation("User with Id {Id} created", newUser.Id);
        
        var token = await _tokenService.GenerateTokenAsync(newUser);
        return token;
    }

    public async Task<string> LoginAsync(UserLoginRequest userLoginRequest)
    {
        var user = await _userManager.FindByNameAsync(userLoginRequest.UserName);
        if (user is null)
        {
            throw new AuthenticationFailureException("Invalid email or password");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, userLoginRequest.Password, false);
        if (!result.Succeeded)
        {
            throw new AuthenticationFailureException("Invalid email or password");
        }

        var token = await _tokenService.GenerateTokenAsync(user);
        return token;
    }

    public async Task<UserResponse?> GetUserAsync(string username)
    {
        var userModel = await _dbContext.User.FirstOrDefaultAsync(u => u.UserName == username);
        if(userModel is null) return null;
        
        return userModel.ToUserResponse();
    }

    public async Task<bool> DeleteUserAsync(string username)
    {
        var userModel = await _dbContext.User.FirstOrDefaultAsync(u => u.UserName == username);
        if(userModel is null) return false;
        
        _dbContext.User.Remove(userModel);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<UserResponse?> UpdateUserAsync(UserUpdateRequest userUpdateRequest)
    {
        var userModel = _dbContext.User.FirstOrDefault(u => u.UserName == userUpdateRequest.UserName);
        if(userModel is null) return null;
        
        _dbContext.Entry(userModel).CurrentValues.SetValues(userUpdateRequest);
        await _dbContext.SaveChangesAsync();
        
        return userModel.ToUserResponse();
    }
}