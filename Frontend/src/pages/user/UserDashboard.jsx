import UserNavbar from "../../components/NavBar/UserNavbar";
import EventCard from "../../components/UserDashboard/EventCard";

const UserDashboard = () => {
  const myTickets = [
    { id: "t1", name: "Event Name", desc: "Event Description" },
    { id: "t2", name: "Event Name", desc: "Event Description" },
  ];

  const myEvents = [
    { id: "e1", name: "Event Name", desc: "Event Description" },
  ];

  const pastEvents = [
    { id: "p1", name: "Event Name", desc: "Event Description" },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-6">
      <div className="mx-auto max-w-6xl">
        <UserNavbar />

        <main className="mt-6">
          

          {/* My Tickets */}
          <section className="mb-8 rounded-xl bg-gray-100 p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              My Tickets
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {myTickets.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* My Events */}
            <section className="rounded-xl bg-gray-100 p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                My Events
              </h2>

              <div className="space-y-4">
                {myEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>

            {/* Past Events */}
            <section className="rounded-xl bg-gray-100 p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Past Events
              </h2>

              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;