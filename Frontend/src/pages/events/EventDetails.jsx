import Navbar from '../../components/NavBar/Navbar'

const EventPage = () => {
  return (
    <div>
      <Navbar />

      {/*Image Placeholder*/}
      <div className = 'bg-gray-300 h-96 flex items-center justify-center m-10 rounded-lg'>
        <span className = 'text-2xl text-gray-700'>Event Image</span>
      </div>

      {/*Event Details*/}
      <div className = 'flex flex-direction-row'>
        <p>Date: ... </p>
        <p>Location: ... </p>
        {/*<p>Capacity: x/y</p> //this is for logged-in users*/}
        {/*<p>Organizer: Joe</p> //this is for logged-in users*/}
        <button>RSVP</button>
      </div>
      <div className = 'flex flex-col'>
        <h1 className = 'text-3xl font-bold text-center'>Event Title</h1>
        <p className = 'text-gray-900 m-8'>Event Description....</p>
      </div>
    </div>
  )
}

export default EventPage