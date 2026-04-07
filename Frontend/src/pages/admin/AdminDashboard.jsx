import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import {
  getAllReports,
  getMostActiveUsers,
  getMostPopularEvents,
  getTotalEvents,
  getTotalReports,
  getTotalUsers
} from "../../api/admin";

function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-sm text-black/55">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight">{value}</p>
      {helper ? <p className="mt-2 text-sm text-black/45">{helper}</p> : null}
    </div>
  );
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, totalReports: 0 });
  const [mostActiveUsers, setMostActiveUsers] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [usersRes, eventsRes, reportsRes, activeUsersRes, popularEventsRes, allReportsRes] = await Promise.all([
          getTotalUsers(),
          getTotalEvents(),
          getTotalReports(),
          getMostActiveUsers(),
          getMostPopularEvents(),
          getAllReports()
        ]);

        setStats({
          totalUsers: usersRes.totalUsers || 0,
          totalEvents: eventsRes.totalEvents || 0,
          totalReports: reportsRes.totalReports || 0
        });
        setMostActiveUsers(activeUsersRes || []);
        setPopularEvents(popularEventsRes || []);
        setReports(allReportsRes || []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const openReports = useMemo(
    () => reports.filter((report) => report.status === "open").slice(0, 5),
    [reports]
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-black/55">
              Monitor platform activity, moderation, and report resolution in one place.
            </p>
          </div>
          <Link
            to="/admin/reports"
            className="rounded-2xl bg-[#5A9BEF] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Review Reports
          </Link>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section className="grid gap-5 md:grid-cols-3">
          <StatCard label="Total Users" value={loading ? "..." : stats.totalUsers} helper="Registered accounts" />
          <StatCard label="Total Events" value={loading ? "..." : stats.totalEvents} helper="Events currently stored" />
          <StatCard label="Total Reports" value={loading ? "..." : stats.totalReports} helper="Open and resolved moderation reports" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Recent Open Reports</h2>
                <p className="mt-1 text-sm text-black/50">Highest-priority moderation items.</p>
              </div>
              <Link to="/admin/reports" className="text-sm font-semibold text-[#5A9BEF] hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {!loading && openReports.length === 0 ? (
                <div className="rounded-2xl bg-[#F3F4F6] px-5 py-6 text-sm text-black/55">
                  No open reports right now.
                </div>
              ) : (
                openReports.map((report) => (
                  <Link
                    key={report._id}
                    to={`/admin/report/${report._id}`}
                    className="block rounded-2xl border border-black/10 bg-[#FAFAFA] px-5 py-4 shadow-sm transition hover:border-[#5A9BEF]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold">{report.reason}</p>
                        <p className="mt-1 text-sm text-black/55 line-clamp-2">
                          {report.description || "No additional description provided."}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#EAF2FE] px-3 py-1 text-xs font-semibold text-[#5A9BEF]">
                        {report.status}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight">Most Active Users</h2>
              <div className="mt-5 space-y-3">
                {loading ? (
                  <p className="text-sm text-black/50">Loading users...</p>
                ) : mostActiveUsers.length === 0 ? (
                  <p className="text-sm text-black/50">No user activity data available yet.</p>
                ) : (
                  mostActiveUsers.map((user) => (
                    <div key={user._id} className="rounded-2xl bg-[#F3F4F6] px-4 py-3">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-black/55">{user.email}</p>
                      <p className="mt-1 text-xs text-black/45">Events created: {user.eventsCreated || 0}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight">Popular Events</h2>
              <div className="mt-5 space-y-3">
                {loading ? (
                  <p className="text-sm text-black/50">Loading events...</p>
                ) : popularEvents.length === 0 ? (
                  <p className="text-sm text-black/50">No event popularity data available yet.</p>
                ) : (
                  popularEvents.map((event) => (
                    <div key={event._id} className="rounded-2xl bg-[#F3F4F6] px-4 py-3">
                      <p className="font-medium">{event.title}</p>
                      <p className="mt-1 text-xs text-black/45">
                        RSVPs: {event.rsvpCount || 0}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
