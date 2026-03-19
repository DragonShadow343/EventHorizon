import { useState } from "react";
import { searchEvents } from "../../api/lab";

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

    const data = await searchEvents(trimmedSearch);

    if (data.results.length === 0) {
      setResults([]);
      setMessage("No results found.");
    } else {
      setResults(data.results);
      setMessage("");
    }

    setSearchTerm("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Events</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {message && <p>{message}</p>}

      <div>
        {results.map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{event.title}</h3>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}