const API = `${import.meta.env.VITE_API_URL}/events`;

function getAuthHeaders() {
  const token = sessionStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getAllEvents() {
    const res = await fetch(`${API}`);
    return res.json();
}

export async function getUpcomingEvents() {
    const res = await fetch(`${API}/upcoming`);
    return res.json();
}

export async function getTrendingEvents() {
    const res = await fetch(`${API}/trending`);
    return res.json();
}

export async function getEventByID(id) {
    const res = await fetch(`${API}/${id}`);
    return res.json();
}

export async function getEventsByOrganizer(id) {
    const res = await fetch(`${API}/organizer/${id}`);
    return res.json();
}

export async function createEvent(eventData) {
    const res = await fetch(`${API}/`, {
        method: "POST",
        headers: {
            ...getAuthHeaders()
        },
        credentials: "include",
        body: eventData,
    });
    return res.json();
}

export async function submitEventReview(newReview) {
    const res = await fetch(`${API}/submitreview`, {
        method: "POST", 
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: JSON.stringify(newReview)
    });
    return res.json();
}

export async function rsvpToEvent(eventId) {
    const res = await fetch(`${API}/${eventId}/rsvp`, {
        method: "POST",
        headers: {
            ...getAuthHeaders()
        },
        credentials: "include",
    });
    return res.json();
}

export async function cancelRsvp(eventId) {
    const res = await fetch(`${API}/${eventId}/rsvp`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders()
        },
        credentials: "include",
    });
    return res.json();
}

export async function deleteMyEvent(eventId) {
    const res = await fetch(`${API}/${eventId}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders()
        },
        credentials: "include",
    });
}

export async function editMyEvent(eventId, updatedEvent) {
    const res = await fetch(`${API}/${eventId}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders()
        },
        credentials: "include",
        body: updatedEvent,
    });
    return res.json();
}

export async function createReport(eventId, reportData) {
    const res = await fetch(`${API}/${eventId}/report`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type":"application/json"
        },
        credentials: "include",
        body: JSON.stringify({reportData}),
    })
    return res.json();
}

export async function createReview(eventId, reviewData) {
    const res = await fetch(`${API}/${eventId}/review`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type":"application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewData),
    })
    return res.json();
}

export const searchEvents = async (searchTerm) => {
  const response = await fetch(
    `${API}/search?q=${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      credentials: "include"
    }
  );

  return response.json();
};