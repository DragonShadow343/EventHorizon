import EventCard2 from '../../components/EventListPage/EventCard2'
import Navbar from '../../components/NavBar/Navbar'
import SearchBar from '../../components/EventListPage/SearchBar'
import { getAllEvents, searchEvents } from '../../api/events'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Events = () => {
  
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;

        if (query) {
          data = await searchEvents(query);
        } else {
          data = await getAllEvents();
        }

        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [query]);

  const handleSearch = (q) => {
    setQuery(q);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-8 lg:px-12 lg:py-10">
        <SearchBar className={'w-full mb-6'} onSearch={handleSearch} />
        <div className="flex-col space-y-6 overflow-auto pb-10">
          {(events.length > 0) ? (events.map((event) => (
            <EventCard2
              key={event._id}
              event={{
                name: event.title,
                desc: event.description,
                date: event.date,
                location: event.location,
                imageURL: `http://localhost:4000/uploads/${event.photos?.[0]}`
              }}
              onClick={() => navigate(`/events/${event._id}`)}
            />
          )))
          :
          (
            <div className=''>
              No Events available
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Events