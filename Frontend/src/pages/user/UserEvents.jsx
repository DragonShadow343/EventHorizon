import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/NavBar/Navbar";
import UserEventCard from "../../components/UserDashboard/UserEventCard";
import { useAuth } from "../../context/AuthContext";
import {
  getMyEvents,
  getMyRsvps,
  getMyPastEvents,
  getMyPastRsvps,
} from "../../api/user";

const UserFullEventsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("myEvents"); // Default tab
  const [myEvents, setMyEvents] = useState([]);
  const [myRsvps, setMyRsvps] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [pastRsvps, setPastRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllEvents = async () => {
    try {
      const [events, rsvps, pastEv, pastRv] = await Promise.all([
        getMyEvents(),
        getMyRsvps(),
        getMyPastEvents(),
        getMyPastRsvps(),
      ]);

      setMyEvents(events);
      setMyRsvps(rsvps);
      setPastEvents(pastEv);
      setPastRsvps(pastRv);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (user?.id) fetchAllEvents();
    const interval = setInterval(fetchAllEvents, 3000);
    return () => clearInterval(interval);

  }, [user]);

  const tabs = [
    { key: "myEvents", label: "My Events", data: myEvents },
    { key: "myRsvps", label: "My RSVPs", data: myRsvps },
    { key: "pastEvents", label: "Past Events", data: pastEvents },
    { key: "pastRsvps", label: "Past RSVPs", data: pastRsvps },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto my-8 max-w-6xl px-4 sm:my-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">Your Events</h1>

        {/* Tabs */}
        <div className="-mx-4 mb-6 flex overflow-x-auto border-b border-gray-300 px-4 sm:mx-0 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`shrink-0 cursor-pointer border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-600 sm:px-4 sm:text-base ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              {tabs.map((tab) => {
                if (tab.key !== activeTab) return null;
                return tab.data.length > 0 ? (
                  <div key={tab.key} className="gap-4 grid grid-cols-1 sm:auto-rows-[300px] md:auto-rows-[250px] lg:grid-cols-2">
                    {tab.data.map((event) => (
                      <UserEventCard
                        key={`${tab.key}-${event._id}`}
                        event={event}
                        onClick={() => navigate(`/events/${event._id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <p key={tab.key} className="text-gray-500">
                    No events found.
                  </p>
                );
              })}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserFullEventsPage;