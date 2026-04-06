const API = "http://localhost:4000/admin";

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }
  return res.json();
}

export async function getAllUsers() {
  const token = localStorage.getItem("accessToken");
  
  const res = await fetch(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getUser(id) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteUser(id) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function toggleUserStatus(id) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/users/${id}/toggle-status`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteEvent(id) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getAllReports() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getReport(reportId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/reports/${reportId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function resolveReport(reportId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/reports/${reportId}/resolve`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteReport(reportId) {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/reports/${reportId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalUsers() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/stats/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalEvents() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/stats/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalReports() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/stats/reports`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getMostActiveUsers() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/stats/active-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getMostPopularEvents() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`${API}/stats/popular-events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include"
  });
  return handleResponse(res);
}
