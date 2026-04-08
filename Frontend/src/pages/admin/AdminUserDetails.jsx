import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser } from "../../api/admin";


const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteUser(id);
    navigate("/admin/user");
  };

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser(id);
      setUser(data);
      setLoading(false);
    }

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black">
      <header className="border-b border-black/10 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <h1 className="text-3xl font-medium tracking-tight">EventHorizon</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="mb-6 flex items-center gap-4">
    <button
            onClick={() => navigate("/admin/user")}
            className="flex h-10 w-28 items-center justify-center rounded-full border border-black/15 bg-white text-sm font-medium transition hover:border-[#5A9BEF] hover:text-[#5A9BEF]"
          >
            ← Back
          </button>
          <h2 className="text-4xl font-medium tracking-tight">User Details</h2>
        </div>

        <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* Left Column */}
            <section className="flex flex-col items-start">
              <div className="flex h-52 w-52 items-center justify-center rounded-[28px] border-2 border-dashed border-black/20 bg-[#EAF2FE]">
                <span className="text-sm font-medium text-black/55">Profile Photo</span>
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
                  <p className="mt-1 text-base font-medium">{user.email || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                  <p className="text-sm text-black/50">Phone</p>
                  <p className="mt-1 text-base font-medium">{user.phone || "N/A"}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">School</p>
                <p className="mt-1 text-base font-medium">{user.school || "N/A"}</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#F8F8F8] px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Profession</p>
                <p className="mt-1 text-base font-medium">{user.profession || "N/A"}</p>
              </div>
            </section>
          </div>
        </div>
        <button 
        onClick={handleDelete}
        className="flex mt-6 ml-1 h-10 w-32 items-center justify-center rounded-full shadow-2xl border-red-600 bg-red-500 text-sm font-medium text-white transition hover:bg-red-600">
          Delete User
        </button>
      </main>
    </div>
  );
};

export default AdminUserDetails;