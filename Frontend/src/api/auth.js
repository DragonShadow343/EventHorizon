const API = "http://localhost:4000/auth";

export async function register(email, password) {
    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "applications/json"},
        body: JSON.stringify({email, password})
    });

    return res.json();
}

export async function login(email, password) {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "applications/json"},
        body: JSON.stringify({email, password})
    });

    return res.json();
}

export async function getCurrentUser(accessToken) {
    const res = await fetch(`${API}/me`, {
        headers: { Authorization:  `Bearer ${accessToken}`}
    });
    return res.json();
}