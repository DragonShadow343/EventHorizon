const API = "http://localhost:4000/admin";

function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

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
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getUser(id) {
  const res = await fetch(`${API}/users/${id}`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteUser(id) {
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function toggleUserStatus(id) {
  const res = await fetch(`${API}/users/${id}/toggle-status`, {
    method: "PATCH",
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteEvent(id) {
  const res = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getAllReports() {
  const res = await fetch(`${API}/reports`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getReport(reportId) {
  const res = await fetch(`${API}/reports/${reportId}`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function resolveReport(reportId) {
  const res = await fetch(`${API}/reports/${reportId}/resolve`, {
    method: "PATCH",
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteReport(reportId) {
  const res = await fetch(`${API}/reports/${reportId}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalUsers() {
  const res = await fetch(`${API}/stats/users`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalEvents() {
  const res = await fetch(`${API}/stats/events`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalReports() {
  const res = await fetch(`${API}/stats/reports`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getMostActiveUsers() {
  const res = await fetch(`${API}/stats/active-users`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getMostPopularEvents() {
  const res = await fetch(`${API}/stats/popular-events`, {
    headers: { ...getAuthHeaders() },
    credentials: "include"
  });
  return handleResponse(res);
}
