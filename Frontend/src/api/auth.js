const API = "http://localhost:4000";

export async function register(email, password) {
    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "applications/json"},
        body: JSON.stringify({email, password})
    });

    return res.json();
}

export async function login(email, password) {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "applications/json"},
        body: JSON.stringify({email, password})
    });

    return res.json();
}

export async function getCurrentUser(accessToken) {
    const res = await fetch(`${API}/auth/me`, {
        headers: { Authorization:  `Bearer ${accessToken}`}
    });
    return res.json();
}