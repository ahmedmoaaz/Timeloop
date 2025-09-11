// event form
/*  perfect "use client";

import { useState, useEffect } from "react";

export default function EventForm({ editingEvent, onAdd, onUpdate, onCancelEdit }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setContent(editingEvent.content || "");
      setDate(editingEvent.date.split("T")[0]);
      setTags(editingEvent.tags.join(","));
    } else {
      setTitle("");
      setContent("");
      setDate("");
      setTags("");
    }
  }, [editingEvent]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const eventData = {
      title,
      content,
      date,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingEvent) {
      const res = await fetch(`/api/events/${editingEvent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      const updatedEvent = await res.json();
      onUpdate(updatedEvent);
    } else {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      const newEvent = await res.json();
      onAdd(newEvent);
    }

    setTitle("");
    setContent("");
    setDate("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 border rounded mr-2"
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="p-2 border rounded mr-2"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {editingEvent ? "Update Event" : "Add Event"}
      </button>
      {editingEvent && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="p-2 bg-gray-500 text-white rounded ml-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
}*/
"use client";
import { useState, useEffect } from "react";

export default function EventForm({ onSave, editEvent, onCancel }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setContent(editEvent.content || "");
      setDate(editEvent.date.split("T")[0]);
      setTags(editEvent.tags.join(","));
    } else {
      setTitle("");
      setContent("");
      setDate("");
      setTags("");
    }
  }, [editEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { title, content, date, tags: tags.split(",").map((t) => t.trim()) };
    await onSave(eventData);
    setTitle("");
    setContent("");
    setDate("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full" />
      <input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full" />
      <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full" />
      <div className="space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editEvent ? "Update Event" : "Add Event"}</button>
        {editEvent && <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
      </div>
    </form>
  );
}


