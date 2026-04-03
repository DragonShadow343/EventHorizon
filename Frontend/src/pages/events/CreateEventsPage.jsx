import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/NavBar/Navbar'
import { createEvent, getEventByID, editMyEvent } from '../../api/events'

const EventPreview = ({ data, onRemoveImage }) => {
  return (
    <div className="p-5 border rounded-2xl bg-white shadow-sm">
      {data.image || data.existingImage && (
        <div className="relative mb-4">
          <img
            src={
              data.image
                ? URL.createObjectURL(data.image)
                : `http://localhost:4000/uploads/${data.existingImage}`
            }
            alt="Event Preview"
            className="w-full h-40 object-cover rounded-xl"
          />
          <button
            onClick={onRemoveImage}
            className="absolute top-2 right-2 bg-black text-white text-xs px-3 py-1 rounded-lg hover:bg-red-500 duration-75 cursor-pointer"
          >
            Remove
          </button>
        </div>
      )}
      <h2 className="text-xl font-semibold">{data.title || 'Event Title'}</h2>
      <p className="mt-2 text-gray-500">{data.description || 'Event description will appear here'}</p>
      <p className="mt-2 text-gray-500">Capacity: {data.capacity || 'N/A'}</p>
      <p className="mt-4 text-sm text-gray-400">{data.date || 'Date'} {data.time && `• ${data.time}`}</p>
      <p className="text-sm text-gray-400">{data.location || 'Location'}</p>
    </div>
  )
}

const CreateEventsPage = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: null,
    capacity: '',
  })
  const navigate = useNavigate();
  const {id} = useParams();
  const isEditMode = Boolean(id)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchEvent = async () => {
      try{
        const event = await getEventByID(id);
        setEventData({
          title: event.title || '',
          description: event.description ||'',
          date: event.date ? event.date.split('T') : '',
          time: event.time || '',
          location: event.location || '',
          image: null,
          existingImage: event.photos?.[0] || null,
          capacity: event.capacity || '',
        });

      } catch (err) {
        console.log('Failed to fetch event: ', err)
      }
    };
    fetchEvent();
  }, [id, isEditMode])

  const handleRemoveImage = () => {
    setEventData({ ...eventData, image: null })
    setImageError('')
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const handleSave = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const { title, description, date, time, location, capacity, image } = eventData;

    const missingFields = [];
    if (!title) missingFields.push('Title');
    if (!description) missingFields.push('Description');
    if (!date) missingFields.push('Date');
    if (!time) missingFields.push('Time');
    if (!location) missingFields.push('Location');
    if (!capacity) missingFields.push('Max Capacity');
    if (!image && !isEditMode) missingFields.push('Image');

    if (missingFields.length > 0) {
      alert(`Please fill out the following required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('time', time);
      formData.append('location', location);
      formData.append('capacity', Number(capacity));
      if (image) formData.append('image', image);

      const response = isEditMode ? await editMyEvent(id, formData) : await createEvent(formData); // send FormData to API
      navigate(`/events/${response._id}`)
    } catch (err) {
      console.error('Failed to create event:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <button className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
            ← Back
          </button>

          <div className="w-full">
            {/* Header */}
            <div className="mb-8">
              <h1 className="mt-2 text-4xl font-semibold text-blue-500">
                {isEditMode ? "Edit your event" : "Build your event page"}
              </h1>
              <p className="mt-3 text-gray-500">
                {isEditMode
                  ? "Update your event details."
                  : "Add details for your event. You can edit everything later."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* LEFT - Form */}
              <div className="col-span-2 space-y-6">
                {/* Image Upload */}
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-100 p-6">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (!file) return
                      if (!file.type.startsWith('image/')) {
                        setImageError('Only image files are allowed')
                        return
                      }
                      if (file.size > 11 * 1024 * 1024) {
                        setImageError('File size must be under 10MB')
                        return
                      }
                      setImageError('')
                      setEventData({ ...eventData, image: file })
                    }}
                    className="text-sm text-gray-500 file:mr-1 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white hover:file:text-white file:text-blue-500 hover:file:bg-blue-500 hover:file:cursor-pointer"
                  />
                  {imageError && <p className="mt-2 text-sm text-red-500">{imageError}</p>}
                </div>

                {/* Title */}
                <div className="rounded-2xl bg-gray-100 p-6">
                  <label className="block text-lg font-semibold mb-2">Event Title</label>
                  <input
                    type="text"
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                    placeholder="Enter your event title"
                    className="w-full rounded-xl border border-gray-200 bg-white text-black px-4 py-3"
                  />
                </div>

                {/* Description */}
                <div className="rounded-2xl bg-gray-100 p-6">
                  <label className="block text-lg font-semibold mb-2">Description</label>
                  <textarea
                    rows="5"
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    placeholder="Write a description..."
                    className="w-full bg-white rounded-xl border border-gray-200 px-4 py-3 resize-none"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {/* Max Capacity */}
                  <div className="rounded-2xl flex gap-4 items-center col-span-2 bg-gray-100 p-6">
                    <label className="block text-lg font-semibold">Max Capacity</label>
                    <input
                      type="number"
                      min="1"
                      value={eventData.capacity}
                      onChange={(e) => setEventData({ ...eventData, capacity: e.target.value })}
                      placeholder="Enter max capacity"
                      className=" rounded-xl border border-gray-200 bg-white text-black px-4 py-3"
                    />
                  </div>

                {/* Date & Time */}
                  <input
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                    className="rounded-xl border-2 border-gray-100 px-4 py-3"
                  />
                  <input
                    type="time"
                    value={eventData.time}
                    onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                    className="rounded-xl border-2 border-gray-100 px-4 py-3"
                  />
                </div>

                {/* Location */}
                <div className="rounded-2xl bg-gray-100 p-6">
                  <label className="block text-lg font-semibold mb-2">Location</label>
                  <input
                    type="text"
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                    placeholder="Enter location"
                    className="w-full rounded-xl bg-white border-2 border-gray-100 px-4 py-3"
                  />
                </div>

                {/* Submit */}
                <button
                  className="w-full rounded-2xl bg-[#5b9df0] py-4 text-white font-semibold"
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? isEditMode ? "Updating..." : "Creating..."
                    : isEditMode ? "Update Event" : "Save Event"
                  }
                </button>
              </div>

              {/* RIGHT - Preview */}
              <div className="col-span-1">
                <EventPreview data={eventData} onRemoveImage={handleRemoveImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateEventsPage