import { useEffect, useState } from "react";
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

  const [activeTab, setActiveTab] = useState("myEvents"); // Default tab
  const [myEvents, setMyEvents] = useState([]);
  const [myRsvps, setMyRsvps] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [pastRsvps, setPastRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (user?.id) fetchAllEvents();
  }, [user]);

  const tabs = [
    { key: "myEvents", label: "My Events", data: myEvents },
    { key: "myRsvps", label: "My RSVPs", data: myRsvps },
    { key: "pastEvents", label: "Past Events", data: pastEvents },
    { key: "pastRsvps", label: "Past RSVPs", data: pastRsvps },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-6 md:mx-20 my-10">
        <h1 className="text-3xl font-semibold mb-6">Your Events</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 -mb-px font-medium text-gray-600 border-b-2 ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent hover:text-blue-600 cursor-pointer"
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
                  <div key={tab.key} className="space-y-4">
                    {tab.data.map((event) => (
                      <UserEventCard
                        key={`${tab.key}-${event._id}`}
                        event={event}
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