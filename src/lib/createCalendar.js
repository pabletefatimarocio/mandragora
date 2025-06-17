export function createCalendar(year, month) {
  const today = new Date();
  const lastDayPrevMonth = new Date(year, month, 0).getDate();
  const lastDayCurrMonth = new Date(year, month + 1, 0).getDate();
  const originalFirstWeekDay = new Date(year, month, 1).getDay();
  const firstWeekDay =
    originalFirstWeekDay === 0 ? 6 : originalFirstWeekDay - 1;

  let monthCursor = "previous";
  let count =
    lastDayCurrMonth === 28 && firstWeekDay === 0
      ? 25
      : lastDayPrevMonth - firstWeekDay + 1;

  if (count > lastDayPrevMonth) {
    monthCursor = "current";
    count = 1;
  }

  const calendar = [[], [], [], [], [], []];
  for (let i = 0; i < calendar.length; i++) {
    for (let j = 0; j < 7; j++) {
      if (
        today.getMonth() === month &&
        today.getDate() === count &&
        monthCursor === "current"
      ) {
        calendar[i].push({
          day: count,
          outline: "today",
        });
      } else {
        calendar[i].push({
          day: count,
          outline: monthCursor === "current" ? "inside" : "outside",
        });
      }

      if (count === lastDayPrevMonth && monthCursor === "previous") {
        count = 1;
        monthCursor = "current";
      } else if (count === lastDayCurrMonth && monthCursor === "current") {
        count = 1;
        monthCursor = "next";
      } else {
        count++;
      }
    }
  }

  const currentMonth = new Date(year, month, 1).toLocaleString("es", {
    month: "long",
  });

  return {
    year,
    month: currentMonth,
    weekDays: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    calendar,
  };
}
