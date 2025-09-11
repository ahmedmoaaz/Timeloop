//eventList
/* perfect "use client";

import EventCard from "./EventCard";

export default function EventList({ events, onEdit, onDelete }: any) {
  return (
    <div>
      {events.map((event: any) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={() => onEdit(event)}
          onDelete={() => onDelete(event.id)}
        />
      ))}
    </div>
  );
}*/
"use client";
import EventCard from "./EventCard";

export default function EventList({ events, onEdit, onDelete }: any) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {events.map((event: any) => (
        <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

