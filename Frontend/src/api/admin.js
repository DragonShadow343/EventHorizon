const API = "http://localhost:4000/admin";

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }
  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API}/users`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getUser(id) {
  const res = await fetch(`${API}/users/${id}`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteUser(id) {
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return handleResponse(res);
}

export async function toggleUserStatus(id) {
  const res = await fetch(`${API}/users/${id}/toggle-status`, {
    method: "PATCH",
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteEvent(id) {
  const res = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getAllReports() {
  const res = await fetch(`${API}/reports`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getReport(reportId) {
  const res = await fetch(`${API}/reports/${reportId}`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function resolveReport(reportId) {
  const res = await fetch(`${API}/reports/${reportId}/resolve`, {
    method: "PATCH",
    credentials: "include"
  });
  return handleResponse(res);
}

export async function deleteReport(reportId) {
  const res = await fetch(`${API}/reports/${reportId}`, {
    method: "DELETE",
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalUsers() {
  const res = await fetch(`${API}/stats/users`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalEvents() {
  const res = await fetch(`${API}/stats/events`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getTotalReports() {
  const res = await fetch(`${API}/stats/reports`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getMostActiveUsers() {
  const res = await fetch(`${API}/stats/active-users`, {
    credentials: "include"
  });
  return handleResponse(res);
}

export async function getMostPopularEvents() {
  const res = await fetch(`${API}/stats/popular-events`, {
    credentials: "include"
  });
  return handleResponse(res);
}
