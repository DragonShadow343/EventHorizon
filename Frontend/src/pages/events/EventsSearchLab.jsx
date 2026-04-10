import { useState } from "react";
import { searchEvents } from "../../api/events";

export default function EventsSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      setResults([]);
      setMessage("Please enter a search term.");
      return;
    }

    try {
      const data = await searchEvents(trimmedSearch);
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
          ? data.results
          : [];

      if (list.length === 0) {
        setResults([]);
        setMessage("No results found.");
      } else {
        setResults(list);
        setMessage("");
      }
    } catch {
      setResults([]);
      setMessage("Search failed. Try again.");
    }

    setSearchTerm("");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="text-xl font-semibold sm:text-2xl">Search Events</h2>

      <form
        onSubmit={handleSearch}
        className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch"
      >
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600 sm:shrink-0"
        >
          Search
        </button>
      </form>

      {message ? <p className="mt-4 text-sm text-gray-600">{message}</p> : null}

      <div className="mt-6 space-y-4">
        {results.map((event) => (
          <div
            key={event._id || event.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Category:</strong> {event.category ?? "—"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Location:</strong> {event.location ?? "—"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}