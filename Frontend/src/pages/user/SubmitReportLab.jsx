import { useState } from "react";
// import { submitReport } from "../../api/lab";

export default function SubmitReport() {
  const [formData, setFormData] = useState({
    eventId: "",
    reason: "",
  });

  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(
      "Lab only: wire submitReport in ../../api/lab to enable submissions."
    );
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <h2 className="text-xl font-semibold sm:text-2xl">Submit Event Report</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Event ID
          </label>
          <input
            type="text"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Reason
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 sm:w-auto"
        >
          Submit Report
        </button>
      </form>

      {serverMessage ? (
        <p className="mt-4 text-sm text-gray-600">{serverMessage}</p>
      ) : null}
    </div>
  );
}
