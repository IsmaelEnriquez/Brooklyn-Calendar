import { useState } from "react";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import CalendarHeader from "../ui/CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import EventModal from "./EventModal";
import { events } from "../../shared/events";

export default function Calendar({ viewMode, onViewChange, selectedCategories }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter events based on selected categories
  const filteredEvents = events.filter(event => selectedCategories.has(event.category));

  const handlePrevious = () => {
    switch (viewMode) {
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
    }
  };

  const handleDateClick = (date, dateEvents) => {
    if (dateEvents.length === 1) {
      setSelectedEvent(dateEvents[0]);
      setIsModalOpen(true);
    } else if (dateEvents.length > 1) {
      // If multiple events, show the first one (can be enhanced later)
      setSelectedEvent(dateEvents[0]);
      setIsModalOpen(true);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="h-full flex flex-col">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onViewChange={onViewChange}
        onToday={handleToday}
      />

      {viewMode === "month" && (
        <MonthView
          currentDate={currentDate}
          events={filteredEvents}
          onDateClick={handleDateClick}
        />
      )}

      {viewMode === "week" && (
        <WeekView
          currentDate={currentDate}
          events={filteredEvents}
          onDateClick={handleDateClick}
        />
      )}

      {viewMode === "day" && (
        <DayView
          currentDate={currentDate}
          events={filteredEvents}
          onEventClick={handleEventClick}
        />
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
