using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineReminder.Dtos.AccountDtos;

public class NotifyRequest
{
    public string Username { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTimeOffset AlarmTime { get; set; }
}
