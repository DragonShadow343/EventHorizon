import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import { deleteReport, getAllReports, resolveReport } from "../../api/admin";

function formatDate(value) {
  if (!value) return "Unknown date";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });  
}
 
const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [busyId, setBusyId] = useState("");

  async function loadReports() {
    try {
      setLoading(true);
      setError("");
      const data = await getAllReports();
      setReports(data || []);
    } catch (err) {
      setError(err.message || "Failed to load reports.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  async function handleResolve(reportId) {
    try {
      setBusyId(reportId);
      await resolveReport(reportId);
      setReports((current) => current.map((report) => (
        report._id === reportId ? { ...report, status: "resolved" } : report
      )));
    } catch (err) {
      setError(err.message || "Failed to resolve report.");
    } finally {
      setBusyId("");
    }
  }

  async function handleDelete(reportId) {
    const confirmed = window.confirm("Delete this report permanently?");
    if (!confirmed) return;

    try {
      setBusyId(reportId);
      await deleteReport(reportId);
      setReports((current) => current.filter((report) => report._id !== reportId));
    } catch (err) {
      setError(err.message || "Failed to delete report.");
    } finally {
      setBusyId("");
    }
  }

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesStatus = statusFilter === "all" ? true : report.status === statusFilter;
      const haystack = `${report.reason} ${report.description || ""}`.toLowerCase();
      const matchesSearch = haystack.includes(search.trim().toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [reports, search, statusFilter]);

  
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Reports</h2>
            <p className="mt-2 text-sm text-black/55">Review, resolve, and remove moderation reports.</p>
          </div>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by reason or description"
              className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[#5A9BEF] sm:min-w-[200px]"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-[#5A9BEF] sm:w-auto sm:shrink-0"
            >
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
              <option value="all">All statuses</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="rounded-[28px] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 hidden grid-cols-[1.7fr_0.6fr_0.8fr] items-center rounded-2xl bg-[#F3F4F6] px-6 py-5 text-lg font-semibold lg:grid">
            <p>Report</p>
            <p>Status</p>
            <p className="text-right">Actions</p>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-2xl bg-[#F3F4F6] px-5 py-6 text-sm text-black/55">Loading reports...</div>
            ) : filteredReports.length === 0 ? (
              <div className="rounded-2xl bg-[#F3F4F6] px-5 py-6 text-sm text-black/55">No reports matched your filters.</div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report._id}
                  className="rounded-2xl border border-black/10 bg-[#FAFAFA] px-5 py-5 shadow-sm transition hover:border-[#5A9BEF] hover:shadow-md"
                >
                  <div className="grid gap-4 lg:grid-cols-[1.7fr_0.6fr_0.8fr] lg:items-center">
                    <div>
                      <p className="text-lg font-semibold">{report.reason}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-black/55">
                        <span>{formatDate(report.createdAt)}</span>
                        {report.reportedBy?.name ? (
                          <>
                            <span>•</span>
                            <span>Reported by {report.reportedBy.name}</span>
                          </>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-black/60">
                        {report.description || "No additional description provided."}
                      </p>
                    </div>

                    <div>
                      <span className="inline-flex rounded-full bg-[#EAF2FE] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#5A9BEF]">
                        {report.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap justify-start gap-3 lg:justify-end">
                      <Link
                        to={`/admin/report/${report._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#5A9BEF] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        Details <span className="text-base">→</span>
                      </Link>

                      {report.status !== "resolved" ? (
                        <button
                          onClick={() => handleResolve(report._id)}
                          disabled={busyId === report._id}
                          className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#5A9BEF] hover:text-[#5A9BEF] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Resolve
                        </button>
                      ) : null}

                      <button
                        onClick={() => handleDelete(report._id)}
                        disabled={busyId === report._id}
                        className="rounded-xl border border-[#FF3B30] bg-[#FFF5F4] px-4 py-2.5 text-sm font-semibold text-[#FF3B30] transition hover:bg-[#FFE9E7] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminReports;
