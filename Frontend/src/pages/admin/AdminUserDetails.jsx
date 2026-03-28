import React from "react";

const AdminUserPage = () => {
  const user = {
    name: "Jordan Lee",
    email: "jordan.lee@email.com",
    phone: "(555) 987-2143",
    school: "Stanford University",
    profession: "Marketing Coordinator",
    socialMedia: "@jordanlee",
    interests: "Live events, tech meetups, photography",
  };

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
            <a href="#" className="text-[#5A9BEF]">
              Active Users
            </a>
            <a href="#" className="transition hover:text-[#5A9BEF]">
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
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex items-center gap-4">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-xl transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]">
            ←
          </button>
          <h2 className="text-4xl font-medium tracking-tight">User Details</h2>
        </div>

        <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* Left Column */}
            <section className="flex flex-col items-start">
              <div className="flex h-52 w-52 items-center justify-center rounded-[28px] border-2 border-dashed border-black/20 bg-[#EAF2FE]">
                <span className="text-sm font-medium text-black/55">
                  Profile Photo
                </span>
              </div>

              <div className="mt-6 w-full rounded-2xl border border-black/10 bg-[#F3F4F6] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Name</p>
                <p className="mt-1 text-base font-medium">{user.name}</p>
              </div>
            </section>

            {/* Right Column */}
            <section className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Email</p>
                  <p className="mt-1 text-base font-medium">{user.email}</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Phone</p>
                  <p className="mt-1 text-base font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">School</p>
                <p className="mt-1 text-base font-medium">{user.school}</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Profession</p>
                <p className="mt-1 text-base font-medium">{user.profession}</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Social Media</p>
                <p className="mt-1 text-base font-medium">{user.socialMedia}</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Interests</p>
                <p className="mt-1 text-base font-medium">{user.interests}</p>
              </div>

              <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                <button className="rounded-full bg-[#E5E7EB] px-8 py-3 text-sm font-semibold text-black transition hover:bg-[#DADDE2]">
                  Email User
                </button>

                <button className="rounded-full border-2 border-[#FF3B30] bg-[#FFF5F4] px-8 py-3 text-sm font-semibold text-[#FF3B30] transition hover:bg-[#FFE9E7]">
                  Ban User
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminUserPage;