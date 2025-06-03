namespace MedicineReminder.Dtos.ScheduleDtos;

public record CreateScheduleRequest(
    string Hour,
    bool IsTaken
);