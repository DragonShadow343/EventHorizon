import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEventByID, deleteMyEvent } from '../../api/events';
import { getUserByID } from '../../api/user';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/NavBar/Navbar';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventByID(id);
        setEvent(data);
        const organizerId = data.organizerId;
        const userData = await getUserByID(organizerId);
        setOrganizerName(userData.name);
        const eventOwner = user && user.id === organizerId;
        setIsOwner(eventOwner);
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleBlueButton = () => {
    if (isOwner) {
      // navigate(`/events/edit/${id}`);
      console.log("Edit event clicked");
    } else {
      // RSVP logic here later
      console.log("RSVP clicked");
    }
  };

  const handleRedButton = async () => {
    (isOwner)? handleDelete() : handleReport();
  }

  const handleDelete = async () => {
    if (!isOwner) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;
    try {
      await deleteMyEvent(id);
      navigate('/events');
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  }

  const handleReport = async () => {
    console.log("Report button clicked");
  }


  if (!event) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 space-y-6">
        {/* Banner with Title Overlay */}
        <div className="relative w-full h-88 rounded-lg overflow-hidden">
          <img
            src={event.imageUrl || '/placeholder-event.jpg'}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-500 bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-center px-4">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Description + Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{event.description}</p>
            </div>

            {/* Reviews */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
              {event.reviews && event.reviews.length > 0 ? (
                <ul className="space-y-4">
                  {event.reviews.map((review) => (
                    <li key={review._id} className="border-b border-gray-200 pb-2">
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-gray-600">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Right Column: Details + Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <p className="text-gray-600">Organizer Name: <span className="font-medium text-gray-800">{organizerName}</span></p>
              <p className="text-gray-600">Date: <span className="text-gray-800">{new Date(event.date).toLocaleString()}</span></p>
              <p className="text-gray-600">Location: <span className="text-gray-800">{event.location}</span></p>

              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <button onClick={handleBlueButton} className="bg-blue-500 hover:bg-blue-600 col-span-2 text-white font-semibold px-6 py-2 rounded-lg shadow cursor-pointer">{isOwner? "Edit Event" : "RSVP"}</button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow cursor-pointer">Share</button>
                <button onClick={handleRedButton} className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow cursor-pointer">{isOwner? "Delete Event" : "Report"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;