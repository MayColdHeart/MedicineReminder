namespace MedicineReminder.Dtos.ScheduleDtos;

public record UpdateScheduleRequest(
    int Id,
    string Hour,
    bool IsTaken
);