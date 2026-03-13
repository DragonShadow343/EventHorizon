const API = "http://localhost:4000/auth";

export async function register(name, email, password) {
    const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({name, email, password})
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }

    return data;
}

export async function login(email, password) {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });

    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.error);
    }

    return data;
}

export async function getCurrentUser(accessToken) {
    const res = await fetch(`${API}/me`, {
        headers: { Authorization:  `Bearer ${accessToken}`}
    });
    return res.json();
}