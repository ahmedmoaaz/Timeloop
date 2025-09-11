//event EventCard
/* perfect"use client";

export default function EventCard({ event, onEdit, onDelete }: any) {
  return (
    <div className="border p-4 rounded mb-2">
      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p>{event.content}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Tags: {event.tags.join(", ")}</p>
      <button onClick={onEdit} className="mr-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
      <button onClick={onDelete} className="p-2 bg-red-500 text-white rounded">Delete</button>
    </div>
  );
}*/
"use client";

export default function EventCard({ event, onEdit, onDelete }: any) {
  return (
    <div className="p-4 border rounded space-y-2">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p>{event.content}</p>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Tags: {event.tags.join(", ")}</p>
      <div className="space-x-2">
        <button onClick={() => onEdit(event)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
        <button onClick={() => onDelete(event.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}
