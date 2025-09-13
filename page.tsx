//dashboard/page.tsxx
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




