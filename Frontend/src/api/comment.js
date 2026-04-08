const API = "http://localhost:4000/comments";

export async function fetchComments (eventId) {
    const res = await fetch(`${API}/events/${eventId}`);
    return res.json();
}

export async function createComment (eventId, data, token) {
    const res = await fetch(`${API}/events/${eventId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(data),
    })
    return res.json();
}

export async function deleteComment (commentId, token) {
    const res = await fetch(`${API}/${commentId}`, {
        method: "DELETE",
        headers: {
            Authorization:  `Bearer ${token}`
        },
        credentials: "include",
    })
    return res.json();
}