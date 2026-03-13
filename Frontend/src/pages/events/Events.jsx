import EventCard2 from '../../components/EventListPage/EventCard2'
import FilterBar from '../../components/EventListPage/FilterBar'
import Navbar from '../../components/NavBar/Navbar'

const Events = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <FilterBar />
        <div className="flex-col w-full mr-8">
          <EventCard2 event={{ name: "Sample Event", desc: "This is a sample event description." }} />
          <EventCard2 event={{ name: "Sample Event", desc: "This is a sample event description." }} />
          <EventCard2 event={{ name: "Sample Event", desc: "This is a sample event description." }} />
          <EventCard2 event={{ name: "Sample Event", desc: "This is a sample event description." }} />
          <EventCard2 event={{ name: "Sample Event", desc: "This is a sample event description." }} />
          <EventCard2 event={{ name: "Sample Event", desc: "This is a sample event description." }} />
        </div>
        
      </div>


    </>
  )
}

export default Events