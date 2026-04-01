import React from "react";
import Navbar from "../../components/NavBar/Navbar";

const reports = [
  {
    id: 1,
    title: "Noise complaint at rooftop event",
    category: "Public disturbance",
    date: "Mar 27, 2026",
    status: "Unresolved",
  },
  {
    id: 2,
    title: "Harassment report from attendee",
    category: "Safety",
    date: "Mar 26, 2026",
    status: "Unresolved",
  },
  {
    id: 3,
    title: "Unauthorized ticket duplication",
    category: "Fraud",
    date: "Mar 25, 2026",
    status: "Unresolved",
  },
  {
    id: 4,
    title: "Host failed to provide venue access",
    category: "Host issue",
    date: "Mar 24, 2026",
    status: "Unresolved",
  },
  {
    id: 5,
    title: "Inappropriate behavior during concert",
    category: "Conduct",
    date: "Mar 23, 2026",
    status: "Unresolved",
  },
  {
    id: 6,
    title: "Scam listing reported by multiple users",
    category: "Trust & Safety",
    date: "Mar 22, 2026",
    status: "Unresolved",
  },
];

const AdminReports = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <h2 className="text-4xl font-medium tracking-tight">
            Unresolved Reports
          </h2>
          <p className="mt-2 text-sm text-black/55">
            Review open reports and take action where needed.
          </p>
        </div>

        <section className="rounded-[28px] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          {/* Header Row */}
          <div className="mb-4 hidden grid-cols-[1.6fr_1fr] items-center rounded-2xl bg-[#F3F4F6] px-6 py-5 text-lg font-semibold sm:grid">
            <p>Report</p>
            <div className="flex items-center justify-end gap-3">
              <span>More Info</span>
              <span className="text-2xl">→</span>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="mb-4 rounded-2xl bg-[#F3F4F6] px-5 py-4 sm:hidden">
            <p className="text-lg font-semibold">Open Report List</p>
          </div>

          {/* Report Rows */}
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="rounded-2xl border border-black/10 bg-[#FAFAFA] px-5 py-5 shadow-sm transition hover:border-[#5A9BEF] hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[1.6fr_1fr] sm:items-center">
                  <div>
                    <p className="text-lg font-semibold">{report.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-black/55">
                      <span>{report.category}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span className="font-medium text-[#5A9BEF]">
                        {report.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-start sm:justify-end">
                    <button className="inline-flex items-center gap-2 rounded-xl bg-[#5A9BEF] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                      More Info
                      <span className="text-base">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminReports;