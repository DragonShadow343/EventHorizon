import React from "react";

const AdminActiveUsers = () => {
  const users = [
    { id: 1, name: "User Name 1" },
    { id: 2, name: "User Name 2" },
    { id: 3, name: "User Name 3" },
    { id: 4, name: "User Name 4" },
    { id: 5, name: "User Name 5" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-300 bg-white px-8 py-5">
        <h1 className="text-3xl font-medium">EventHorizon</h1>

        <div className="flex gap-8 text-sm md:text-base">
          <a href="#" className="transition hover:text-[#5B9BF3]">
            Dashboard
          </a>
          <a href="#" className="transition hover:text-[#5B9BF3]">
            Active Users
          </a>
          <a href="#" className="transition hover:text-[#5B9BF3]">
            Reports
          </a>
          <a href="#" className="transition hover:text-[#5B9BF3]">
            Create Event
          </a>
          <a href="#" className="transition hover:text-[#5B9BF3]">
            My Events
          </a>
          <a href="#" className="transition hover:text-[#5B9BF3]">
            Settings
          </a>
        </div>
      </nav>

      {/* Page Content */}
      <div className="px-6 py-10 md:px-12 lg:px-20">
        <h2 className="mb-8 text-4xl font-medium">Active Users</h2>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-[#d9d9d9] px-6 py-5 text-xl"
            >
              <span>{user.name}</span>

              <button className="flex items-center gap-3 transition hover:opacity-70">
                <span>More Info</span>
                <span className="text-4xl leading-none">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminActiveUsers;