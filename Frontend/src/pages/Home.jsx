import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar/Navbar";
import { searchEvents, getTrendingEvents, getUpcomingEvents } from "../api/events";

const API_BASE = "http://localhost:4000";
const HERO_FALLBACK = "/hero-events.svg";
const EVENT_FALLBACK = "/event-placeholder.svg";

const getEventImage = (event) => {
  if (!event) return EVENT_FALLBACK;

  const candidates = [
    event.image,
    event.imageURL,
    event.imageUrl,
    event.thumbnail,
    event.coverImage,
    event.cover,
    event.banner,
    event.photo,
    event.photos?.[0],
  ].filter(Boolean);

  const image = candidates[0];
  if (!image) return EVENT_FALLBACK;
  if (String(image).startsWith("http") || String(image).startsWith("blob:") || String(image).startsWith("data:")) {
    return image;
  }
  if (String(image).startsWith("/uploads/")) {
    return `${API_BASE}${image}`;
  }
  if (String(image).startsWith("uploads/")) {
    return `${API_BASE}/${image}`;
  }

  return `${API_BASE}/uploads/${image}`;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    loadHomeData();
  }, []);

  const heroImage = useMemo(() => {
    const featuredEvent = [...trending, ...upcoming].find((event) => getEventImage(event) !== EVENT_FALLBACK);
    return featuredEvent ? getEventImage(featuredEvent) : HERO_FALLBACK;
  }, [trending, upcoming]);

  const loadHomeData = async () => {
    try {
      const trendingData = await getTrendingEvents();
      const upcomingData = await getUpcomingEvents();

      setTrending(Array.isArray(trendingData) ? trendingData.slice(0, 4) : []);
      setUpcoming(Array.isArray(upcomingData) ? upcomingData.slice(0, 4) : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchEvents(value);
      setSearchResults(Array.isArray(results) ? results.slice(0, 5) : []);
    } catch (err) {
      console.error(err);
    }
  };

  const renderEventCard = (event) => (
    <Link
      key={event._id}
      to={`/events/${event._id}`}
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={getEventImage(event)}
        alt={event.title}
        className="h-44 w-full object-cover"
        onError={(e) => {
          e.currentTarget.src = EVENT_FALLBACK;
        }}
      />

      <div className="p-4">
        <h3 className="text-lg font-medium text-slate-800">{event.title}</h3>

        <p className="mt-1 text-sm text-slate-500">
          {event.date ? new Date(event.date).toLocaleDateString() : "Date TBA"}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {event.description || "Explore event details and see what’s coming up."}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar className="border-b border-slate-200 bg-white/80 px-6 backdrop-blur md:px-12" />

      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Events"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = HERO_FALLBACK;
          }}
        />

        <div className="absolute inset-0 bg-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/20 to-slate-950/35" />

        <div className="relative z-10 w-full max-w-3xl px-6 text-center text-white">
          <h1 className="mb-4 text-4xl font-medium md:text-5xl">
            Discover Events Around You
          </h1>

          <p className="mb-6 text-lg text-slate-200">
            Browse trending events, find upcoming experiences, and connect with your community.
          </p>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full rounded-xl border border-white/20 bg-white/95 px-5 py-3 text-slate-800 shadow-lg focus:outline-none"
            />

            {searchResults.length > 0 && (
              <div className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-xl bg-white text-slate-800 shadow-lg">
                {searchResults.map((event) => (
                  <Link
                    key={event._id}
                    to={`/events/${event._id}`}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-100"
                  >
                    <img
                      src={getEventImage(event)}
                      alt={event.title}
                      className="h-12 w-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = EVENT_FALLBACK;
                      }}
                    />
                    <div className="min-w-0 text-left">
                      <p className="truncate text-sm font-medium text-slate-800">{event.title}</p>
                      <p className="truncate text-xs text-slate-500">
                        {event.date ? new Date(event.date).toLocaleDateString() : "Date TBA"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-medium text-slate-800">Trending Events</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {trending.map(renderEventCard)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-6 text-2xl font-medium text-slate-800">Upcoming Events</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {upcoming.map(renderEventCard)}
        </div>
      </section>
    </div>
  );
}
