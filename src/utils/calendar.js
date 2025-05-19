export function createCalendar(year, month, day) {
  const calendar = [
    ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    [],
    [],
    [],
    [],
    [],
    [],
  ];
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const lastDayOfPastMonth = new Date(year, month - 1, 0).getDate();
  const lastDayOfCurrentMonth = new Date(year, month, 0).getDate();
  const firstDayOfCalendar =
    firstDayOfWeek === 0 ? 1 : lastDayOfPastMonth - firstDayOfWeek + 1;

  const dayCount = { month, day };

  if (firstDayOfWeek === 0) {
    dayCount.month = month;
  } else {
    dayCount.month = month - 1;
  }

  dayCount.day = firstDayOfCalendar;

  for (let row = 1; row <= 6; row++) {
    for (let tile = 0; tile < 7; tile++) {
      if (dayCount.month === month && dayCount.day === day) {
        calendar[row][tile] = { day: dayCount.day, type: "today" };
      } else {
        if (dayCount.month !== month) {
          calendar[row][tile] = { day: dayCount.day, type: "outside" };
        } else {
          calendar[row][tile] = { day: dayCount.day, type: "inside" };
        }
      }

      if (dayCount.month < month) {
        if (dayCount.day < lastDayOfPastMonth) {
          dayCount.day++;
        } else {
          dayCount.day = 1;
          dayCount.month++;
        }
      } else {
        if (dayCount.day < lastDayOfCurrentMonth) {
          dayCount.day++;
        } else {
          dayCount.day = 1;
          dayCount.month++;
        }
      }
    }
  }

  const currentMonth = new Date(year, month - 1, day).toLocaleString("es", {
    month: "long",
  });
  return {
    year,
    month: currentMonth[0].toUpperCase() + currentMonth.slice(1),
    calendar,
  };
}
