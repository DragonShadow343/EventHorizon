import EventCard2 from '../../components/EventListPage/EventCard2'
import FilterBar from '../../components/EventListPage/FilterBar'
import Navbar from '../../components/NavBar/Navbar'
import SearchBar from '../../components/EventListPage/SearchBar'
import { getAllEvents, searchEvents } from '../../api/events'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Events = () => {
  
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {

    fetchEvents();

    const interval = setInterval(fetchEvents, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (query) => {
    try {

      if (!query) {
        const data = await getAllEvents();
        setEvents(data);
        return;
      }
      
      const results = await searchEvents(query);
      setEvents(results);
    } catch (err) {
      console.log('Error searching for events: ', err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-[240px_1fr] grid-rows-[60px_1fr] gap-8 m-10 mb-0 mt-12">
        <FilterBar className={'row-span-2'} />
        <SearchBar className={'mx-1'} onSearch={handleSearch} />
        <div className="flex-col max-h-[calc(100vh-220px)] overflow-scroll space-y-6 pb-18 px-1">
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