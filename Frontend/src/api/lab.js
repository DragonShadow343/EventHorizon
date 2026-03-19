const BASE_URL = "http://localhost:4000/lab";

export const submitReport = async (reportData) => {
  const response = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(reportData)
  });

  return response.json();
};

export const searchEvents = async (searchTerm) => {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`,
    {
      method: "GET",
      credentials: "include"
    }
  );

  return response.json();
};