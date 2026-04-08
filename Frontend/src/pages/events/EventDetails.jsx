import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEventByID, deleteMyEvent, rsvpToEvent, cancelRsvp, createReview } from '../../api/events';
import { getUserByID } from '../../api/user';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/NavBar/Navbar';

const AttendeeList = ({ attendees, onClose, capacity }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 h-3/4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-3xl cursor-pointer text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold">Attendees <span className='text-sm ml-4 font-mono text-gray-400'>{attendees.length}/{capacity}</span></h2>

        {attendees && attendees.length > 0 ? (
          <ul className="space-y-2 mt-6 overflow-y-auto h-[calc(100%-50px)] overflow-scroll">
            {attendees.map((id, index) => (
              <AttendeeBar attendee={id} key={index} />
            ))}
          </ul>
        ) : (
          <p className="flex justify-center items-center text-gray-500 h-[calc(100%-26px)]">No attendees yet</p>
        )}
      </div>
    </div>
  );
}

const AttendeeBar = ({attendee}) => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByID(attendee);
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch attendee:", err);
      }
    };

    if (attendee) fetchUser();
  }, [attendee]);

  if (!userData) {
    return (
      <li className="p-2 border rounded text-gray-400">
        Loading...
      </li>
    );
  }

  return (
    <li className="p-3 bg-gray-100 rounded flex items-center ">
      <span className="font-semibold text-gray-800">{userData.name}</span>
      <span className="text-sm ml-10 text-gray-500">{userData.email}</span>
    </li>
  );
}

const ReviewModal = ({ onClose, eventId, onSubmitted }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userName = user.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    try {
      await createReview(eventId, {userName, comment, rating });
      setComment("");
      onSubmitted && onSubmitted();
      onClose();
    } catch (err) {
      console.error("Failed to submit review:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-3xl cursor-pointer text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {[1,2,3,4,5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded p-3 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [organizerName, setOrganizerName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isRSVPing, setIsRSVPing] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [eventPassed, setEventPassed] = useState(true);
  const [showAttendees, setShowAttendees] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

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

        const hasPassed = new Date(data.date) < new Date();
        setEventPassed(hasPassed);

        if (user && data.rsvp) {
          const alreadyRSVPed = data.rsvp.some(id => id.toString() === user.id);
          setIsRSVPed(alreadyRSVPed);
        }

        if (user && data.reviews) {
          const reviewed = data.reviews.some(r => r.userId?.toString() === user.id);
          setHasReviewed(reviewed);
        }
        if (user && data.rsvp) {
          const hasRSVPedForReview = data.rsvp.some(id => id.toString() === user.id);
          setIsRSVPed(hasRSVPedForReview);
        }
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    };

    fetchEvent();
  }, [id, user]);

  const handleBlueButton = async () => {
    if (isOwner) {
      handleEdit();
    } else {
      handleRSVP();
    }
  };

  const handleEdit = () => {
      navigate(`/user/events/${id}/edit`);
  }

  const handleRSVP = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsRSVPing(true);
    try {
      if (isRSVPed) {
        await cancelRsvp(id);
        setIsRSVPed(false);
      } else {
        await rsvpToEvent(id);
        setIsRSVPed(true);
      }
    } catch (err) {
      console.error("RSVP action failed:", err);
    } finally {
      setIsRSVPing(false);
    }
  }

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

  const handleYellowButton = async () => {
    isOwner ? handleAttendeeList() : handleReviewButton();
  }

  const handleAttendeeList = async () => {
    if (!isOwner) return;
    setShowAttendees(true);
  }
  
  const handleReviewButton = async () => {
    if (isOwner || !user) return;
    setShowReview(true);
  }

  if (!event) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 space-y-6">
        {/* Banner with Title Overlay */}
        <div className="relative w-full h-88 rounded-lg overflow-hidden">
          <img
            src={`http://localhost:4000/uploads/${event.photos?.[0]}`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center">
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
                      <p className="text-yellow-400">
                        {"★".repeat(review.rating || 0)}{"☆".repeat(5 - (review.rating || 0))}
                      </p>
                      <p className="text-gray-600">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <p className="text-gray-600">Organizer Name: <span className="font-medium text-gray-800">{organizerName}</span></p>
              <p className="text-gray-600">Date: <span className="text-gray-800">{new Date(event.date).toLocaleString()}</span></p>
              <p className="text-gray-600">Location: <span className="text-gray-800">{event.location}</span></p>

              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <button
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                      return;
                    }
                    handleBlueButton();
                  }}
                  disabled={isRSVPing}
                  className="bg-blue-500 hover:bg-blue-600 col-span-2 text-white font-semibold px-6 py-2 rounded-lg shadow cursor-pointer"
                >
                  {!user
                    ? "Login to RSVP"
                    : isOwner
                      ? "Edit Event"
                      : isRSVPing
                        ? "Processing..."
                        : isRSVPed
                          ? "Cancel RSVP"
                          : "RSVP"
                  }
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow cursor-pointer">Share</button>
                <button onClick={handleRedButton} className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow cursor-pointer">{isOwner? "Delete Event" : "Report"}</button>
                <button
                  onClick={handleYellowButton}
                  disabled={!isOwner && (!eventPassed || !user || hasReviewed)}
                  className={`col-span-2 font-semibold px-6 py-2 rounded-lg shadow cursor-pointer ${
                    isOwner
                      ? "bg-amber-100 hover:bg-amber-200 text-amber-500"
                      : (!eventPassed || !user || !isRSVPed)
                        ? "hidden"
                        : hasReviewed
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-amber-100 hover:bg-amber-200 text-amber-500"
                  }`}
                >
                  {isOwner
                    ? "Show Attendee List"
                    : !user
                      ? "Login to Review"
                      : hasReviewed
                        ? "Already Reviewed"
                        : !eventPassed
                          ? ""
                          : "Review Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAttendees && (
        <AttendeeList
          attendees={event.rsvp}
          onClose={() => setShowAttendees(false)}
          capacity={event.capacity}
        />
      )}
      {showReview && user && !isOwner && (
        <ReviewModal
          eventId={id}
          onClose={() => setShowReview(false)}
          onSubmitted={async () => {
            const updated = await getEventByID(id);
            setEvent(updated);
            if (user && updated.reviews) {
              const reviewed = updated.reviews.some(r => r.userId?.toString() === user.id);
              setHasReviewed(reviewed);
            }
          }}
        />
      )}
    </>
  );
};

export default EventPage;