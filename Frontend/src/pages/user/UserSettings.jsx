import Navbar from "../../components/NavBar/Navbar";
import { useAuth } from "./../../context/AuthContext"
import { useNavigate } from "react-router";

const UserSettings = () => {

  const { logout } = useAuth();
  const Navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-6">
      <div className="mx-auto max-w-4xl">
        <Navbar />

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            Edit Profile
          </h2>

          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left */}
            <div className="flex flex-col items-center gap-4">
              <div className="h-32 w-32 rounded-xl bg-gray-200" />

              <input
                type="text"
                placeholder="Name"
                className="w-40 rounded-lg border border-gray-300 px-3 py-2 outline-none"
              />
            </div>

            {/* Right */}
            <div className="flex flex-1 flex-col gap-4">
              {["Email", "Phone", "School", "Profession", "Social Media", "Interests"].map(
                (field) => (
                  <input
                    key={field}
                    placeholder={field}
                    className="rounded-lg border border-gray-300 px-4 py-3 outline-none"
                  />
                )
              )}

              <div className="mt-4 flex gap-4">
                <button className="rounded-lg border border-red-500 px-5 py-2 text-red-500">
                  Delete Account
                </button>

                <button onClick={handleLogout} className="rounded-lg bg-blue-500 px-5 py-2 text-white">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;