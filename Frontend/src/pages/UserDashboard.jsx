import React from 'react'
import EventCard from '../components/EventCard/EventCard'

const UserDashboard = () => {

  // Replace with real data from API
  const myTickets = () => [
      { id: "t1", name: "Event Name", desc: "Event Description" },
      { id: "t2", name: "Event Name", desc: "Event Description" },
    ];

  const myEvents = () => [{ id: "e1", name: "Event Name", desc: "Event Description" }];

  const pastEvents = () => [{ id: "p1", name: "Event Name", desc: "Event Description" }];

  return (
    <>
     <header class="flex shadow-xl h-20 w-screen mx-auto px-20 items-center justify-between">
        <div class="text-xl font-bold">EventHorizon</div>

        <nav class="flex gap-x-10">
          <a class="text-lg" href="/user-dashboard">
            Dashboard
          </a>
          <a class="text-lg" href="/events/create">
            Create Event
          </a>
          <a class="text-lg" href="/events/mine">
            My Events
          </a>
          <a class="text-lg" href="/settings">
            Settings
          </a>
        </nav>
      </header>

        {/* Dashboard */}
      <main class="p-20">
        <h1 class="text-2xl font-bold">Dashboard</h1>

        {/* My Tickets*/}
        <section class="mt-10 mb-20">
          <div class="text-xl font-bold">My Tickets</div>

          <div class="grid grid-cols-3 gap-4">
            {myTickets.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
          </div>
        </section>

        {/* My Events and Past Events */}
        <div class="grid grid-cols-2 gap-4">
          <section class="bg-gray-100 p-4">
            <div class="text-lg font-bold">My Events</div>
            <div class="grid grid-cols-1 gap-4 mt-4">
              {myEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          </section>

          <section class="bg-gray-100 p-4">
            <div class="text-lg font-bold">Past Events</div>
            <div class="grid grid-cols-1 gap-4 mt-4">
              {pastEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}




export default UserDashboard







