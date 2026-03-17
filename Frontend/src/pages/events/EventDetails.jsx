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
      <h1 className = 'text-3xl font-bold text-center'>Event Title</h1>
    </div>
  )
}

export default EventPage