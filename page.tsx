//dashboard/page.tsx
/*"use client";

import { useState, useEffect } from "react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [filterTag, setFilterTag] = useState<string>("");

  useEffect(() => {
    fetchEvents();
  }, [filterTag]);

  const fetchEvents = async () => {
    const res = await fetch(`/api/events/search?tag=${encodeURIComponent(filterTag)}`);
    const data = await res.json();
    setEvents(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <input
        type="text"
        placeholder="Filter by tag"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <EventForm
        key={editingEvent?.id || "new"}
        editingEvent={editingEvent}
        onAdd={(newEvent) => {
          setEvents((prev) => [...prev, newEvent]);
          setEditingEvent(null);
        }}
        onUpdate={(updatedEvent) => {
          setEvents((prev) =>
            prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
          );
          setEditingEvent(null);
        }}
        onCancelEdit={() => setEditingEvent(null)}
      />

      <EventList
        events={events}
        onEdit={(event) => setEditingEvent(event)}
        onDelete={async (id) => {
          await fetch(`/api/events/${id}`, { method: "DELETE" });
          setEvents((prev) => prev.filter((e) => e.id !== id));
        }}
      />
    </div>
  );
}*/
/* perfect "use client";
import { useState, useEffect } from "react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const [tag, setTag] = useState("");
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchEvents = async () => {
    const params = new URLSearchParams();
    if (tag) params.append("tag", tag);
    if (query) params.append("query", query);
    if (title) params.append("title", title);
    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);

    const res = await fetch(`/api/events/search?${params.toString()}`);
    const data = await res.json();
    console.log("Filtered events:", data);

    if (Array.isArray(data)) {
      setEvents(data);
    } else {
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Query (title/content)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Title only"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={fetchEvents}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Search / Filter
        </button>
      </div>

      <EventForm
        key={editingEvent?.id || "new"}
        editingEvent={editingEvent}
        onAdd={(newEvent) => {
          setEvents((prev) => [...prev, newEvent]);
          setEditingEvent(null);
        }}
        onUpdate={(updatedEvent) => {
          setEvents((prev) =>
            prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
          );
          setEditingEvent(null);
        }}
        onCancelEdit={() => setEditingEvent(null)}
      />

      <EventList
        events={events}
        onEdit={(event) => setEditingEvent(event)}
        onDelete={async (id) => {
          await fetch(`/api/events/${id}`, { method: "DELETE" });
          setEvents((prev) => prev.filter((e) => e.id !== id));
        }}
      />
    </div>
  );
}*/

/*"use client";
import { useState, useEffect } from "react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [editEvent, setEditEvent] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchEvents = async () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);

    const res = await fetch(`/api/events/search?${params.toString()}`);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSave = async (eventData: any) => {
    if (editEvent) {
      await fetch(`/api/events/${editEvent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      setEditEvent(null);
    } else {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
    }
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  const handleEdit = (event: any) => {
    setEditEvent(event);
  };

  const handleCancelEdit = () => {
    setEditEvent(null);
  };

  const handleSearch = () => {
    fetchEvents();
  };
  
 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Search by tag, title, or content"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex space-x-2">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border rounded p-2" />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border rounded p-2" />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search/Filter</button>
        </div>
      </div>

      <EventForm onSave={handleSave} editEvent={editEvent} onCancel={handleCancelEdit} />
      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}*/

"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

export default function Dashboard() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<any[]>([]);
  const [editEvent, setEditEvent] = useState<any>(null);
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchEvents = async () => {
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (fromDate) params.append("from", fromDate);
    if (toDate) params.append("to", toDate);

    const res = await fetch(`/api/events/search?${params.toString()}`);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    if (session) fetchEvents();
  }, [session]);

  const handleSave = async (eventData: any) => {
    const url = editEvent ? `/api/events/${editEvent.id}` : "/api/events";
    const method = editEvent ? "PATCH" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    setEditEvent(null);
    fetchEvents();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    fetchEvents();
  };

  const handleEdit = (event: any) => setEditEvent(event);

  const handleCancelEdit = () => setEditEvent(null);

  const handleSearch = () => fetchEvents();

  if (!session) {
    return <div className="p-4">You must be logged in to view events.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Search by tag, title, or content"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex space-x-2">
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="border rounded p-2" />
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="border rounded p-2" />
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Search/Filter</button>
        </div>
      </div>

      <EventForm onSave={handleSave} editEvent={editEvent} onCancel={handleCancelEdit} />
      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}



