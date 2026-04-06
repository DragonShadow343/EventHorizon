import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../api/admin";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(id);
        setUser(data);
      } catch (err) {
        setUser({ name: "Failed to load user", email: "", phone: "" });
      } finally {
        setLoading(false);
      }
    };

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
        <h2 className="text-4xl font-medium tracking-tight mb-6">User Details</h2>

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
      </main>
    </div>
  );
};

export default AdminUserDetails;