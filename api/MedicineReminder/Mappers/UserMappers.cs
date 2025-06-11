using MedicineReminder.Dtos.AccountDtos;
using MedicineReminder.Models;

namespace MedicineReminder.Mappers;

public static class UserMappers
{
    // Model to Dto
    public static UserMainInfoResponse ToUserMainInfoResponse(this User userModel)
    {
        return new UserMainInfoResponse(
            UserName: userModel.UserName,
            CreatedAt: userModel.CreatedAt,
            Photo: userModel.Photo
        );
    }

    public static UserResponse ToUserResponse(this User userModel)
    {
        return new UserResponse
        (
            UserName: userModel.UserName,
            Email: userModel.Email, 
            PhoneNumber: userModel.PhoneNumber, 
            CreatedAt: userModel.CreatedAt, 
            Photo: userModel.Photo
        );
    }
    
    
    // Dto to Model
    public static User ToUserModel(this UserMainInfoResponse userMainInfoResponse)
    {
        return new User
        {
            UserName = userMainInfoResponse.UserName,
            Photo = userMainInfoResponse.Photo,
        };
    }

    public static User ToUserModel(this UserRegisterRequest userRegisterRequest)
    {
        return new User
        {
            UserName = userRegisterRequest.UserName,
            Email = userRegisterRequest.Email,
            PhoneNumber = userRegisterRequest.PhoneNumber,
        };
    }
}