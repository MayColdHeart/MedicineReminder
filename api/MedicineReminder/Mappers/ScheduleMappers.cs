using MedicineReminder.Dtos.ScheduleDtos;
using MedicineReminder.Models;

namespace MedicineReminder.Mappers;

public static class ScheduleMappers
{
    // Models to Dtos
    public static ScheduleResponse ToScheduleResponse(this Schedule scheduleModel)
    {
        return new ScheduleResponse(
            Id: scheduleModel.Id,
            Hour: scheduleModel.Hour,
            IsTaken: scheduleModel.IsTaken
        );
    }
}