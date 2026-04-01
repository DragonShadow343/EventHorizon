import React from "react";
import Navbar from "../../components/NavBar/Navbar";

const users = [
  { id: 1, name: "Olivia Carter", email: "olivia.carter@email.com" },
  { id: 2, name: "James Anderson", email: "james.anderson@email.com" },
  { id: 3, name: "Sophia Martinez", email: "sophia.martinez@email.com" },
  { id: 4, name: "Noah Thompson", email: "noah.thompson@email.com" },
  { id: 5, name: "Emma White", email: "emma.white@email.com" },
];

const AdminActiveUsers = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <h2 className="text-4xl font-medium tracking-tight">Active Users</h2>
          <p className="mt-2 text-sm text-black/55">
            View and manage currently active users on the platform.
          </p>
        </div>

        <section className="rounded-[28px] border border-black/10 bg-white p-4 shadow-sm sm:p-6">
          {/* Header Row */}
          <div className="mb-4 hidden grid-cols-[1.5fr_1fr] items-center rounded-2xl bg-[#F3F4F6] px-6 py-5 text-lg font-semibold sm:grid">
            <p>User Name</p>
            <div className="flex items-center justify-end gap-3">
              <span>More Info</span>
              <span className="text-2xl">→</span>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="mb-4 rounded-2xl bg-[#F3F4F6] px-5 py-4 sm:hidden">
            <p className="text-lg font-semibold">Active User List</p>
          </div>

          {/* User Rows */}
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-black/10 bg-[#FAFAFA] px-5 py-5 shadow-sm transition hover:border-[#5A9BEF] hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[1.5fr_1fr] sm:items-center">
                  <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="mt-1 text-sm text-black/55">{user.email}</p>
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

export default AdminActiveUsers;