import React from "react";

const EventPage = () => {
  const event = {
    name: "Event Name",
    description:
      "This is where the event description will go. You can replace this with real event data from your backend later.",
    date: "April 12, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "UBC Campus, Kelowna",
    host: "Event Host",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b-2 border-[#5B9BF3] bg-white px-8 py-5">
        <h1 className="text-3xl font-medium">EventHorizon</h1>

        <div className="flex gap-10">
          <a href="#" className="hover:text-[#5B9BF3]">Dashboard</a>
          <a href="#" className="hover:text-[#5B9BF3]">Create Event</a>
          <a href="#" className="hover:text-[#5B9BF3]">My Events</a>
          <a href="#" className="hover:text-[#5B9BF3]">Settings</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[360px] w-full overflow-hidden border-b-2 border-[#5B9BF3]">
        
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover brightness-75"
        />

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 text-white text-3xl hover:opacity-80"
        >
          ←
        </button>

        {/* Event Name */}
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-4xl font-medium">
            {event.name}
          </h2>
        </div>

      </section>

      {/* Content */}
      <section className="flex flex-col lg:flex-row justify-between gap-10 px-8 py-12 lg:px-16">
        
        {/* Left Side */}
        <div className="flex-1">
          
          <h3 className="text-3xl mb-6 font-medium">
            Event Description
          </h3>

          <p className="text-gray-700 leading-8 max-w-3xl">
            {event.description}
          </p>

          {/* RSVP Buttons */}
          <div className="mt-12 inline-flex bg-[#d9d9d9] rounded-full p-1">
            
            <button className="px-8 py-3 rounded-full bg-[#bfbfbf] hover:bg-[#b5b5b5] transition">
              Yes
            </button>

            <button className="px-8 py-3 rounded-full hover:bg-[#cfcfcf] transition">
              Maybe
            </button>

            <button className="px-8 py-3 rounded-full hover:bg-[#cfcfcf] transition">
              No
            </button>

          </div>

        </div>

        {/* Right Info Card */}
        <div className="bg-[#dddddd] rounded-3xl p-8 w-full lg:w-[320px] h-fit">
          
          <div className="space-y-6">

            <div>
              <p className="font-semibold text-gray-600">
                Event Date
              </p>
              <p>{event.date}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">
                Event Time
              </p>
              <p>{event.time}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">
                Event Location
              </p>
              <p>{event.location}</p>
            </div>

            <div>
              <p className="font-semibold text-gray-600">
                Event Host
              </p>
              <p>{event.host}</p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default EventPage;