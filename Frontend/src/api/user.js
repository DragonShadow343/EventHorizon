const API = `${import.meta.env.VITE_API_URL}/users`;

function getAuthHeaders() {
  const token = sessionStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Login, register and currentUser are in api/auth.js

export async function updateUserData(data) {

    const res = await fetch(`${API}/me`, {
        method: "PUT",
        headers: {...getAuthHeaders(),},
        credentials: "include",
        body: data,
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Update failed:", text);
        return null;
    }

    return res.json();
}

export async function getUserByID(userId) {
    const res = await fetch(`${API}/${userId}`)

    return res.json();
}

// TODO: Add endpoint to get just the name

export async function getMyEvents() {
    const res = await fetch(`${API}/events`, {
        credentials: "include",
        headers: {...getAuthHeaders(),}
    })
    return res.json();
}

export async function getMyRsvps() {
    const res = await fetch(`${API}/rsvps`, {
        credentials: "include",
        headers: {...getAuthHeaders(),}
    })
    return res.json();
}

export async function getMyPastEvents() {
    const res = await fetch(`${API}/events/past`, {
        credentials: "include",
        headers: {...getAuthHeaders(),}
    })
    return res.json();
}

export async function getMyPastRsvps() {
    const res = await fetch(`${API}/rsvps/past`, {
        credentials: "include",
        headers: {...getAuthHeaders(),}
    })
    return res.json();
}

export async function getMyReviews() {
    const res = await fetch(`${API}/reviews`, {
        credentials: "include",
        headers: {...getAuthHeaders(),}
    })
    return res.json();
}

export async function updateUserPassword(newPassword) {
    const res = await fetch(`${API}/me/changepassword`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(newPassword),
    });
    return res.json();
}

export async function updateUserSettings(newSettings) {
    const res = await fetch(`${API}/me/settings`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(newSettings),
    });
    return res.json();
}