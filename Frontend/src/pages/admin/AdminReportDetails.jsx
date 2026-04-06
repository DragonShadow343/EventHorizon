import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { deleteEvent, deleteReport, getReport, resolveReport } from "../../api/admin"; 

function formatDate(value) {
  if (!value) return "Unknown date";
  return new Date(value).toLocaleString();
}

const AdminReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyAction, setBusyAction] = useState("");

   useEffect(() => {
    async function loadReport() {
      try {
        setLoading(true);
        setError("");
        const data = await getReport(id);
        setReport(data);
      } catch (err) {
        setError(err.message || "Failed to load report details.");
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, [id]);

  async function handleResolve() {
    try {
      setBusyAction("resolve");
      await resolveReport(id);
      setReport((current) => ({ ...current, status: "resolved" }));
    } catch (err) {
      setError(err.message || "Failed to resolve report.");
    } finally {
      setBusyAction("");
    }
  }

  async function handleDeleteReport() {
    const confirmed = window.confirm("Delete this report permanently?");
    if (!confirmed) return;

    try {
      setBusyAction("delete-report");
      await deleteReport(id);
      navigate("/admin/reports");
    } catch (err) {
      setError(err.message || "Failed to delete report.");
      setBusyAction("");
    }
  }

  async function handleDeleteEvent() {
    if (!report?.eventId?._id) return;

    const confirmed = window.confirm("Delete the event attached to this report?");
    if (!confirmed) return;

    try {
      setBusyAction("delete-event");
      await deleteEvent(report.eventId._id);
      setReport((current) => ({ ...current, eventId: null }));
    } catch (err) {
      setError(err.message || "Failed to delete event.");
    } finally {
      setBusyAction("");
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-xl transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]"
          >
            ←
          </button>
          <div>
            <h2 className="text-4xl font-medium tracking-tight">Report Details</h2>
            {report ? <p className="mt-1 text-sm text-black/50">Created {formatDate(report.createdAt)}</p> : null}
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 text-sm text-black/55 shadow-sm">
            Loading report details...
          </div>
        ) : !report ? (
          <div className="rounded-[28px] border border-black/10 bg-white p-8 text-sm text-black/55 shadow-sm">
            Report not found.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <section className="space-y-5">
              <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-semibold">Report Description</p>
                  <span className="rounded-full bg-[#EAF2FE] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#5A9BEF]">
                    {report.status}
                  </span>
                </div>
                <div className="rounded-2xl bg-[#F3F4F6] p-6 text-sm leading-7 text-black/70 sm:text-base">
                  {report.description || "No description was provided for this report."}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Report Reason</p>
                  <p className="mt-1 text-base font-medium">{report.reason}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Reported By</p>
                  <p className="mt-1 text-base font-medium">{report.reportedBy?.name || "Unknown user"}</p>
                  <p className="mt-1 text-sm text-black/55">{report.reportedBy?.email || "No email available"}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap">
                {report.status !== "resolved" ? (
                  <button
                    onClick={handleResolve}
                    disabled={busyAction === "resolve"}
                    className="rounded-2xl bg-[#5A9BEF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Resolve Report
                  </button>
                ) : null}

                <button
                  onClick={handleDeleteReport}
                  disabled={busyAction === "delete-report"}
                  className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-[#5A9BEF] hover:text-[#5A9BEF] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete Report
                </button>

                {report.eventId?._id ? (
                  <button
                    onClick={handleDeleteEvent}
                    disabled={busyAction === "delete-event"}
                    className="rounded-2xl border border-[#FF3B30] bg-[#FFF5F4] px-6 py-3 text-sm font-semibold text-[#FF3B30] transition hover:bg-[#FFE9E7] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Delete Event
                  </button>
                ) : null}
              </div>
            </section>

            <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
              <div className="rounded-[24px] border-2 border-dashed border-black/15 bg-[#EAF2FE] p-5 text-sm text-black/60">
                <h3 className="text-xl font-semibold text-black">Related Event</h3>
                {report.eventId ? (
                  <>
                    <p className="mt-4 text-lg font-medium text-black">{report.eventId.title || "Untitled event"}</p>
                    <p className="mt-2 leading-6">{report.eventId.description || "No event description available."}</p>
                    <div className="mt-4 space-y-2 text-sm">
                      {report.eventId.location ? <p><span className="font-semibold text-black">Location:</span> {report.eventId.location}</p> : null}
                      {report.eventId.date ? <p><span className="font-semibold text-black">Date:</span> {formatDate(report.eventId.date)}</p> : null}
                    </div>
                  </>
                ) : (
                  <p className="mt-3">This event is no longer available.</p>
                )}
              </div>

              {report.reportedBy?._id ? (
                <div className="mt-5 rounded-2xl bg-[#F3F4F6] p-5 text-sm text-black/65">
                  <p className="font-semibold text-black">Reporter</p>
                  <p className="mt-1">{report.reportedBy.name || "Unknown user"}</p>
                  <p>{report.reportedBy.email || "No email available"}</p>
                  <Link to={`/admin/user/${report.reportedBy._id}`} className="mt-3 inline-flex text-sm font-semibold text-[#5A9BEF] hover:underline">
                    Open user profile
                  </Link>
                </div>
              ) : null}
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminReportPage;