import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import UserEventCard from "../../components/UserDashboard/UserEventCard";
import { getMyEvents, getMyRsvps, getMyPastRsvps } from "../../api/user";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const [myTickets, setMyTickets] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [rsvps, createdEvents, pastRsvps] = await Promise.all([
        getMyRsvps(),
        getMyEvents(),
        getMyPastRsvps(),
      ]);

      const now = new Date();

      // Filter upcoming RSVPs (tickets)
      const upcomingTickets = rsvps
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Sort created events chronologically
      const createdSorted = createdEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      
      // Sort past RSVPs by latest first
      const pastSorted = pastRsvps.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setMyTickets(upcomingTickets);
      setMyEvents(createdSorted);
      setPastEvents(pastSorted);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user events:", err);
      setLoading(false);
    }
  };

  useEffect(() => {

    if (user?.id) fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);

  }, [user]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto my-6 max-w-6xl px-4 sm:my-8 sm:px-6 lg:px-10">
        <h1 className="my-6 text-2xl font-semibold sm:my-10 sm:text-3xl">Hi, {user?.name}</h1>

        {loading ? (
          <p className="text-gray-500">Loading your events...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* My Tickets */}
              <section className="relative col-span-1 mb-2 rounded-xl bg-gray-100 p-5 shadow-sm lg:col-span-2 lg:mb-8">
                <h2 className="mb-4 text-lg font-semibold text-gray-700">
                  My Tickets
                </h2>
                {myTickets.length > 2 ? (
                    <p className="absolute top-4 right-4 text-sm text-blue-500 sm:top-5 sm:right-6 sm:text-base">More RSVPs →</p>
                  ) : (<></>)}
                {myTickets.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {myTickets.slice(0,2).map(event => (
                      <UserEventCard key={`ticket-${event._id}`} event={event} onClick={() => navigate(`/events/${event._id}`)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">You have no tickets.</p>
                )}
              </section>

              {/* My Events */}
              <section className="relative rounded-xl bg-gray-100 p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-700">
                  My Events
                </h2>
                {myEvents.length > 2 ? (
                  <p className="absolute top-4 right-4 text-sm text-blue-500 sm:top-5 sm:right-6 sm:text-base">More Events →</p>
                ) : (<></>)}
                {myEvents.length > 0 ? (
                  <div className="grid grid-cols-1 grid-rows-2 gap-6">
                    {myEvents.slice(0,2).map(event => (
                      <UserEventCard key={`myEvent-${event._id}`} event={event} onClick={() => navigate(`/events/${event._id}`)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">You have no upcoming events.</p>
                )}
              </section>

              {/* Past Events */}
              <section className="relative rounded-xl bg-gray-100 p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-700">
                  Past Events
                </h2>
                {pastEvents.length >= 2 ? (
                  <p className="absolute top-4 right-4 text-sm text-blue-500 sm:top-5 sm:right-6 sm:text-base">More Past Events →</p>
                ) : (<></>)}
                {pastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 grid-rows-2 gap-6">
                    {pastEvents.slice(0,2).map(event => (
                      <UserEventCard key={`past-${event._id}`} event={event} onClick={() => navigate(`/events/${event._id}`)} />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No past events found.</p>
                )}
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;