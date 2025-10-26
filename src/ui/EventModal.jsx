import { X } from "lucide-react";
import { Button } from "./button";
import { eventCategories } from "../../shared/events";

export default function EventModal({ event, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      data-testid="modal-event-backdrop"
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div 
        className="relative bg-card border border-card-border rounded-md w-full max-w-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-event-content"
      >
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-card-border p-4 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground truncate" data-testid="text-event-name">
              {event.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${eventCategories[event.category].color}`} />
              <span className="text-sm text-muted-foreground">{eventCategories[event.category].label}</span>
            </div>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={onClose}
            data-testid="button-close-modal"
            className="flex-shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <img 
            src={event.flyerUrl} 
            alt={`${event.name} flyer`}
            className="w-full h-auto object-contain rounded-md"
            data-testid="img-event-flyer"
          />
        </div>
      </div>
    </div>
  );
}
