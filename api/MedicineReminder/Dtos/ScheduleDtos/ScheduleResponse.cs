namespace MedicineReminder.Dtos.ScheduleDtos;

public record ScheduleResponse(
    int Id,
    DateTimeOffset Hour,
    bool IsTaken
);