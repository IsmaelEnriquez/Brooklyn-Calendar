import { eventCategories } from "../../shared/events";
import { parseEventDate } from "../../shared/utils";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";

export default function WeekView({ currentDate, events, onDateClick }) {
  const weekStart = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = parseEventDate(event.date);
      return isSameDay(eventDate, date);
    });
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {weekDays.map((day) => {
          const dayEvents = getEventsForDate(day);
          const hasEvents = dayEvents.length > 0;
          const today = isToday(day);

          return (
            <button
              key={day.toString()}
              onClick={() => hasEvents && onDateClick(day, dayEvents)}
              className={`
                flex flex-col p-4 border border-border rounded-lg min-h-36 bg-card
                transition-all duration-200
                ${today ? "ring-2 ring-primary/30 bg-primary/5" : ""}
                ${hasEvents ? "cursor-pointer hover-elevate active-elevate-2" : "cursor-default"}
              `}
              data-testid={`week-date-${format(day, "yyyy-MM-dd")}`}
            >
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {format(day, "EEE")}
              </div>
              <div className={`text-3xl font-bold mt-2 ${today ? "text-primary" : "text-foreground"}`}>
                {format(day, "d")}
              </div>
              {hasEvents && (
                <div className="mt-4 flex flex-col gap-2">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs text-left px-3 py-2 bg-background text-foreground rounded-md truncate flex items-center gap-2 border border-border"
                      data-testid={`week-event-${event.id}`}
                    >
                      <div className={`w-2 h-2 rounded-full ${eventCategories[event.category].color} flex-shrink-0`} />
                      <span className="truncate font-medium">{event.name || eventCategories[event.category].label}</span>
                    </div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
