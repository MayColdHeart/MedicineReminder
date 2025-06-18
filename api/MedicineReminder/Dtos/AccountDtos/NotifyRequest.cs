using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineReminder.Dtos.AccountDtos;

public record NotifyRequest(string Message, DateTimeOffset AlarmTime);
