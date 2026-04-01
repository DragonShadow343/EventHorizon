import React from "react";
import Navbar from "../../components/NavBar/Navbar";

const AdminReportPage = () => {
  const report = {
    description:
      "This report was submitted regarding behavior at an event. Review the details, identify the people involved, and decide whether follow-up action is needed.",
    reportee: "Jordan Lee",
    host: "Sophia Carter",
    eventName: "Campus Spring Social",
    eventDescription:
      "An evening networking event hosted for students and local organizers.",
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      {/* Top Navigation */}
      <Navbar/>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-xl transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
            ←
          </button>
          <h2 className="text-4xl font-medium tracking-tight">Report Details</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Left Side */}
          <section className="space-y-5">
            <div className="rounded-[28px] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="mb-4 text-lg font-semibold">Report Description</p>
              <div className="rounded-2xl bg-[#F3F4F6] p-6 text-sm leading-7 text-black/70 sm:text-base">
                {report.description}
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm text-black/50">Reportee</p>
              <p className="mt-1 text-base font-medium">{report.reportee}</p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
              <p className="text-sm text-black/50">Event Host</p>
              <p className="mt-1 text-base font-medium">{report.host}</p>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <button className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
                Contact Reportee
              </button>

              <button className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
                Contact Host
              </button>

              <button className="rounded-2xl border border-[#FF3B30] bg-[#FFF5F4] px-6 py-3 text-sm font-semibold text-[#FF3B30] transition hover:bg-[#FFE9E7]">
                Delete Event
              </button>
            </div>
          </section>

          {/* Right Side */}
          <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">
              <div className="flex h-52 w-full items-center justify-center rounded-[24px] border-2 border-dashed border-black/20 bg-[#EAF2FE] text-sm font-medium text-black/55 shadow-sm sm:w-48 lg:w-full xl:w-48">
                Event Image
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {report.eventName}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-black/60">
                    {report.eventDescription}
                  </p>
                </div>

                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5A9BEF] transition hover:underline"
                >
                  More info <span>→</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AdminReportPage;