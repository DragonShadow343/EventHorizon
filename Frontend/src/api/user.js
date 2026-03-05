const API = "http://localhost:4000/users";

// Login, register and currentUser are in api/auth.js

export async function updateUserData(data) {
    const res = await fetch(`${API}/me`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function getUserByID(userId) {
    const res = await fetch(`${API}/${userId}`)

    return res.json();
}

export async function getMyEvents() {
    const res = await fetch(`${API}/events`, {credentials: "include"})
    return res.json();
}

export async function getMyRsvps() {
    const res = await fetch(`${API}/rsvps`, {credentials: "include"})
    return res.json();
}

export async function getMyPastEvents() {
    const res = await fetch(`${API}/events/past`, {credentials: "include"})
    return res.json();
}

export async function getMyPastRsvps() {
    const res = await fetch(`${API}/rsvps/past`, {credentials: "include"})
    return res.json();
}

export async function getMyReviews() {
    const res = await fetch(`${API}/reviews`, {credentials: "include"})
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