import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../api/admin";
import Navbar from "../../components/NavBar/Navbar";


const AdminActiveUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      const data = await getAllUsers(search);
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Active Users</h2>
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

          {/* Search Bar */}
          <div className="mb-6 flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border px-4 py-2"
            />
            <button
              onClick={handleSearch}
              className="rounded-xl bg-[#5A9BEF] px-4 py-2 text-white font-semibold"
            >
              Search
            </button>
          </div>

          {/* User Rows */}
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="rounded-2xl border border-black/10 bg-[#FAFAFA] px-5 py-5 shadow-sm transition hover:border-[#5A9BEF] hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[1.5fr_1fr] sm:items-center">
                  <div>
                    <p className="text-lg font-semibold">{user.name}</p>
                    <p className="mt-1 text-sm text-black/55">{user.email}</p>
                  </div>

                  <div className="flex justify-start sm:justify-end">
                    <button
                      onClick={() => {
                        navigate(`/admin/user/${user._id}`)}}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#5A9BEF] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
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