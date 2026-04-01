import Navbar from "../../components/NavBar/Navbar";
import UserEventCard from "../../components/UserDashboard/UserEventCard";
import { useAuth } from "../../context/AuthContext"

const UserDashboard = () => {

  const { user } = useAuth();

  const myTickets = [
    { id: "t1", name: "Event Name", desc: "Event Description" },
    { id: "t2", name: "Event Name", desc: "Event Description" },
  ];

  const myEvents = [
    { id: "e1", name: "Event Name", desc: "Event Description" },
    { id: "e1", name: "Event Name", desc: "Event Description" },
  ];

  const pastEvents = [
    { id: "p1", name: "Event Name", desc: "Event Description" },
    { id: "p1", name: "Event Name", desc: "Event Description" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="">
        <Navbar />


        <main className="my-3 mx-20">

          <h1 className="text-3xl m-6 my-10">Hi, {user.name}</h1>

          {/* My Tickets */}
          <section className="mb-8 rounded-xl bg-gray-100 p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              My Tickets
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {myTickets.map((event) => (
                <UserEventCard key={event.id} event={event} />
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
                  <UserEventCard key={event.id} event={event} />
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
                  <UserEventCard key={event.id} event={event} />
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