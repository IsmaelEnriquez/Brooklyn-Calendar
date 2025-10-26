import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Button } from "./button";

export default function CalendarHeader({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onViewChange,
  onToday,
}) {
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const viewModes = [
    { mode: "month", label: "Month" },
    { mode: "week", label: "Week" },
    { mode: "day", label: "Day" },
  ];

  return (
    <div className="p-6 border-b border-border bg-card">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onPrevious}
              data-testid="button-previous"
              className="h-9 w-9"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onNext}
              data-testid="button-next"
              className="h-9 w-9"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-month-year">
              {viewMode === "day" ? dayOfWeek : monthYear}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="default"
            onClick={onToday}
            data-testid="button-today"
            className="gap-2"
          >
            <CalendarDays className="h-4 w-4" />
            Today
          </Button>
        </div>
      </div>
    </div>
  );
}
