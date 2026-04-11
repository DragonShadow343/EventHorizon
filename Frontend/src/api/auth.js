const API = `${import.meta.env.VITE_API_URL}/auth`;

export async function register(nameOrFormData, email, password, image) {
    const formData = nameOrFormData instanceof FormData
        ? nameOrFormData
        : (() => {
            const data = new FormData();
            data.append('name', nameOrFormData ?? '');
            data.append('email', email ?? '');
            data.append('password', password ?? '');
            if (image) data.append('image', image);
            return data;
        })();

    const res = await fetch(`${API}/register`, {
        method: "POST",
        body: formData
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

    sessionStorage.setItem("accessToken", data.accessToken);

    return data;
}

export async function getCurrentUser(accessToken) {
    const res = await fetch(`${API}/me`, {
        headers: { Authorization:  `Bearer ${accessToken}`}
    });
    return res.json();
}