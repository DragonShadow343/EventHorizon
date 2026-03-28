import React from "react";

const AdminReportPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      {/* Top Navigation */}
      <header className="border-b border-black/10 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <h1 className="text-3xl font-medium tracking-tight">EventHorizon</h1>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="transition hover:text-[#5A9BEF]">
              Dashboard
            </a>
            <a href="#" className="transition hover:text-[#5A9BEF]">
              Active Users
            </a>
            <a href="#" className="text-[#5A9BEF]">
              Reports
            </a>
            <a href="#" className="transition hover:text-[#5A9BEF]">
              Create Event
            </a>
            <a href="#" className="transition hover:text-[#5A9BEF]">
              My Events
            </a>
            <a href="#" className="transition hover:text-[#5A9BEF]">
              Settings
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Back + Title */}
        <div className="mb-10 flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-xl transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
            ←
          </button>
          <h2 className="text-4xl font-medium tracking-tight">Report Details</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column */}
          <section className="space-y-6">
            <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Report Description</h3>
              <div className="rounded-2xl bg-[#F3F4F6] p-6 text-[15px] leading-7 text-black/70">
                This report contains event-related concerns submitted by users.
                Review the summary below, identify the parties involved, and take
                the appropriate action if needed.
              </div>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm">
              <p className="mb-1 text-sm font-medium text-black/50">Reportee</p>
              <p className="text-lg font-medium">Alex Johnson</p>
            </div>

            <div className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm">
              <p className="mb-1 text-sm font-medium text-black/50">Event Host</p>
              <p className="text-lg font-medium">Sophia Carter</p>
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <button className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium shadow-sm transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
                Contact Reportee
              </button>

              <button className="rounded-2xl border border-black/10 bg-white px-6 py-3 text-sm font-medium shadow-sm transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
                Contact Host
              </button>

              <button className="rounded-2xl bg-[#5A9BEF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90">
                Delete Event
              </button>
            </div>
          </section>

          {/* Right Column */}
          <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row lg:flex-col xl:flex-row">
              {/* Event Image Placeholder */}
              <div className="flex h-56 w-full items-center justify-center rounded-[24px] bg-[#5A9BEF] text-white shadow-inner sm:w-52 lg:w-full xl:w-52">
                <span className="text-sm font-medium tracking-wide">
                  Event Image
                </span>
              </div>

              {/* Event Info */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-2xl font-semibold tracking-tight">
                    Event Name
                  </p>
                  <p className="mt-3 text-sm leading-6 text-black/60">
                    A short summary of the event goes here. This can include key
                    details that help the admin quickly understand what the event
                    is about.
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