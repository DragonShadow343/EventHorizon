import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser, toggleUserRole } from "../../api/admin";
import Navbar from "../../components/NavBar/Navbar";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteUser(id);
    navigate("/admin/user");
  };

  const handleRoleToggle = async () => {
    try {
      await toggleUserRole(id);
      const updated = await getUser(id);
      setUser(updated.user);
      setEvents(updated.events || []);
    } catch (err) {
      console.error("Failed to toggle role:", err);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const data = await getUser(id);
        console.log(data);
        setUser(data.user);
        setEvents(data.events);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] text-black">
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
          <p className="text-sm text-black/55">Loading…</p>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] text-black">
        <Navbar />
        <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
          <p className="text-sm text-black/55">User not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <button
            onClick={() => navigate("/admin/user")}
            className="flex h-10 w-full items-center justify-center rounded-full border border-black/15 bg-white text-sm font-medium transition hover:border-[#5A9BEF] hover:text-[#5A9BEF] sm:w-28"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">User Details</h2>
        </div>

        <div className="rounded-4xl border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* Left Column */}
            <section className="flex flex-col items-start">
              <div className="flex h-40 w-40 items-center justify-center overflow-clip rounded-[28px] border-2 border-dashed border-black/20 bg-white sm:h-52 sm:w-52">
                {(user.avatar)? (
                  <img src={`${import.meta.env.VITE_API_URL}/uploads/${user.avatar}`} alt={user.name} className="object-cover" />
                ):(
                  <span className="text-sm font-medium text-black/55">Profile Photo</span>
                )}
              </div>

              <div className="mt-6 w-full rounded-2xl border border-black/10 bg-[#F3F4F6] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Name</p>
                <p className="mt-1 text-base font-medium">{user.name}</p>
              </div>
              <div className="mt-6 flex w-full space-x-2">
                <button
                  onClick={handleRoleToggle}
                  className="h-10 w-full cursor-pointer rounded-full border border-black/15 bg-white hover:border-[#5A9BEF] hover:text-[#5A9BEF] sm:w-32"
                  >
                  Toggle Role
                </button>
                <button
                  onClick={handleDelete}
                  className="h-10 w-full cursor-pointer rounded-full border-2 hover:text-white border-red-500/15 bg-red-500/20 hover:border-red-500 hover:bg-red-500 sm:w-32"
                  >
                  Delete User
                </button>
              </div>
            </section>

            {/* Right Column */}
            <section className="space-y-4">
              <div className="gap-4">
                <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Email</p>
                  <p className="mt-1 text-base font-medium">{user.email || "N/A"}</p>
                </div>
              </div>

                {/* <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Phone</p>
                  <p className="mt-1 text-base font-medium">{user.phone || "N/A"}</p>
                </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">School</p>
                <p className="mt-1 text-base font-medium">{user.school || "N/A"}</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Profession</p>
                <p className="mt-1 text-base font-medium">{user.profession || "N/A"}</p>
              </div> */}
              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Role</p>
                <p className="mt-1 text-base font-medium capitalize">
                  {user.role || "N/A"}
                </p>
              </div>

            </section>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">User Events</h3>

          {events.length === 0 ? (
            <p className="text-sm text-black/55">No events created</p>
          ) : (
            <div className="space-y-2">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <p>{event.title}</p>
                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="text-blue-500 text-sm"
                  >
                    View →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUserDetails;