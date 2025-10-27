import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "../ui/sidebar";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui//label";
import { eventCategories, events } from "../../shared/events";
import { parseEventDate } from "../../shared/utils";
import { isFuture, isToday, format } from "date-fns";

export function AppSidebar({ viewMode, onViewChange, selectedCategories, onToggleCategory }) {
  const viewModes = [
    { mode: "month", label: "Month" },
    { mode: "week", label: "Week" },
    { mode: "day", label: "Day" },
  ];

  // Get upcoming events (today and future)
  const upcomingEvents = events
    .map(event => ({
      ...event,
      parsedDate: parseEventDate(event.date)
    }))
    .filter(event => isToday(event.parsedDate) || isFuture(event.parsedDate))
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
    .slice(0, 5);

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h2 className="font-semibold text-lg text-sidebar-foreground">Event Calendar</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* View Mode Selector */}
        <SidebarGroup>
          <SidebarGroupLabel>View</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {viewModes.map(({ mode, label }) => (
                <SidebarMenuItem key={mode}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(mode)}
                    isActive={viewMode === mode}
                    data-testid={`sidebar-view-${mode}`}
                  >
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Category Filters */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3 py-2">
            <div className="space-y-3">
              {Object.entries(eventCategories).map(([key, { label, color }]) => {
                const category = key;
                const isChecked = selectedCategories.has(category);
                return (
                  <div 
                    key={key} 
                    className="flex items-center gap-2" 
                    data-testid={`filter-${key}`}
                  >
                    <Checkbox
                      id={`category-${key}`}
                      checked={isChecked}
                      onCheckedChange={() => onToggleCategory(category)}
                      data-testid={`checkbox-${key}`}
                    />
                    <label
                      htmlFor={`category-${key}`}
                      className="flex items-center gap-2 cursor-pointer text-sm flex-1"
                    >
                      <div className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="text-sidebar-foreground">{label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upcoming Events */}
        <SidebarGroup>
          <SidebarGroupLabel>Upcoming Events</SidebarGroupLabel>
          <SidebarGroupContent className="px-3 py-2">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-2 rounded-md bg-sidebar-accent/50 hover-elevate active-elevate-2 cursor-pointer"
                    data-testid={`upcoming-event-${event.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${eventCategories[event.category].color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-sidebar-foreground truncate">
                          {event.name || eventCategories[event.category].label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(event.parsedDate, "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No upcoming events</p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
