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
}