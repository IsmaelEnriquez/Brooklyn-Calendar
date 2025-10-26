import { eventCategories } from "../../shared/events";;
import { parseEventDate } from "../../shared/utils";
import { isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth } from "date-fns";

export default function MonthView({ currentDate, events, onDateClick }) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(day);
      day = addDays(day, 1);
    }
    rows.push(days);
    days = [];
  }

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = parseEventDate(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border bg-muted/30">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-xs font-semibold text-foreground uppercase tracking-wide"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {rows.map((week, weekIdx) =>
            week.map((day, dayIdx) => {
              const dayEvents = getEventsForDate(day);
              const hasEvents = dayEvents.length > 0;
              const isCurrentMonth = isSameMonth(day, currentDate);
              const today = isToday(day);

              return (
                <button
                  key={`${weekIdx}-${dayIdx}`}
                  onClick={() => hasEvents && onDateClick(day, dayEvents)}
                  className={`
                    min-h-24 md:min-h-28 p-3 border-b border-r border-border last:border-r-0
                    transition-all duration-200
                    ${!isCurrentMonth ? "text-muted-foreground bg-muted/10" : "text-foreground bg-background"}
                    ${hasEvents ? "cursor-pointer hover-elevate active-elevate-2" : "cursor-default"}
                    ${today ? "bg-primary/5 ring-1 ring-primary/20" : ""}
                  `}
                  data-testid={`date-${format(day, "yyyy-MM-dd")}`}
                >
                  <div className="flex flex-col items-start h-full gap-2">
                    <span
                      className={`
                        text-sm md:text-base font-medium
                        ${today ? "bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center" : ""}
                      `}
                    >
                      {format(day, dateFormat)}
                    </span>
                    {hasEvents && (
                      <div className="flex gap-1.5 flex-wrap items-center">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`w-2 h-2 rounded-full transition-transform hover:scale-150 ${eventCategories[event.category].color}`}
                            data-testid={`event-dot-${event.id}`}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs font-medium text-primary ml-1">
                            +{dayEvents.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
