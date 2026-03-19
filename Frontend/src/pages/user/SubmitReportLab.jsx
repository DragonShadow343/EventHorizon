import { useState } from "react";
import { submitReport } from "../../api/lab";

export default function SubmitReport() {
  const [formData, setFormData] = useState({
    eventId: "",
    reason: ""
  });

  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await submitReport(formData);

    if (data.success) {
      setServerMessage(data.message);
      setFormData({
        eventId: "",
        reason: ""
      });
    } else {
      setServerMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Event Report</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Event ID: </label>
          <input
            type="text"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Reason: </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit Report</button>
      </form>

      {serverMessage && <p style={{ marginTop: "15px" }}>{serverMessage}</p>}
    </div>
  );
}