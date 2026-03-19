const API = "http://localhost:4000/events";

export async function getAllEvents() {
    const res = await fetch(`${API}`);
    return res.json();
}

export async function getEventsByID(id) {
    const res = await fetch(`${API}/${id}`);
    return res.json();
}

export async function getEventsByOrganizer(userId) {
    const res = await fetch(`${API}/${id}`);
    return res.json();
}

export async function createEvent(eventData) {
    const res = await fetch(`${API}/createvent`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify(eventData),
    });
    return res.json();
}

export async function submitEventReview(newReview) {
    const res = await fetch(`${API}/submitreview`, {
        method: "POST", 
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newReview)
    });
    return res.json();
}

export async function rsvpToEvent(eventId) {
    const res = await fetch(`${API}/${eventId}/rsvp`, {
        method: "POST",
        credentials: "include",
    });
    return res.json();
}

export async function cancelRsvp(eventId) {
    const res = await fetch(`${API}/${eventId}/rsvp`, {
        method: "DELETE",
        credentials: "include",
    });
    return res.json();
}

export async function deleteMyEvent(eventId) {
    const res = await fetch(`${API}/deletevent/${eventId}`, {
        method: "DELETE",
        credentials: "include",
    });
}

export async function editMyEvent(eventId, updatedEvent) {
    const res = await fetch(`${API}/editmyevent/${eventId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(updatedEvent),
    });
    return res.json();
}

export async function createReport(eventId, reportData) {
    const res = await fetch(`${API}/report/${eventId}`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify(reportData),
    })
    return res.json();
}

export async function createReview(eventId, reviewData) {
    const res = await fetch(`${API}/review/${eventId}`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
        body: JSON.stringify(reviewData),
    })
    return res.json();
}

export const searchEvents = async (searchTerm) => {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      credentials: "include"
    }
  );

  return response.json();
};