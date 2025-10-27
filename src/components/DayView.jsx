import { eventCategories } from "../../shared/events";;
import { parseEventDate } from "../../shared/utils";
import { format, isSameDay } from "date-fns";

export default function DayView({ currentDate, events, onEventClick }) {
  const dayEvents = events.filter((event) => {
    const eventDate = parseEventDate(event.date);
    return isSameDay(eventDate, currentDate);
  });

  const isToday = isSameDay(currentDate, new Date());

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-8 p-6 rounded-lg bg-card border border-border ${isToday ? "ring-2 ring-primary/30 bg-primary/5" : ""}`}>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {format(currentDate, "EEEE")}
          </div>
          <div className={`text-5xl font-bold mt-3 ${isToday ? "text-primary" : "text-foreground"}`}>
            {format(currentDate, "d")}
          </div>
          <div className="text-base text-muted-foreground mt-2">
            {format(currentDate, "MMMM yyyy")}
          </div>
        </div>

        {dayEvents.length > 0 ? (
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                className="w-full p-5 border border-border bg-card rounded-lg hover-elevate active-elevate-2 text-left transition-all duration-200"
                data-testid={`day-event-${event.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-4 h-4 rounded-full ${eventCategories[event.category].color} flex-shrink-0 mt-1`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground">{event.name || eventCategories[event.category].label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{eventCategories[event.category].label}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <p className="text-lg text-muted-foreground">No events scheduled for this day</p>
          </div>
        )}
      </div>
    </div>
  );
}
