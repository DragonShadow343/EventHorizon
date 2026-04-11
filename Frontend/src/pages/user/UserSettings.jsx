import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../api/auth";

const UserSettings = () => {
  const { user, logout, updateUser } = useAuth(); // assume updateUser exists
  const navigate = useNavigate();

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    username: user?.name || "",
    email: user?.email || "",
    profilePic: user?.avatar || "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    (async () => {
      try {
        const me = await getCurrentUser(token);
        if (!me) return;
        setFormData((prev) => ({
          ...prev,
          username: me.name ?? prev.username,
          email: me.email ?? prev.email,
          profilePic: me.avatar ?? prev.profilePic,
        }));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const profilePicSrc =
    formData.profilePic && typeof formData.profilePic === "string"
      ? formData.profilePic
      : undefined;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async (field) => {
    setEditingField(null);
    try {
      if (formData[field] !== user?.[field]) {
        const res = await updateUser({ [field]: formData[field] });
        if (!res) throw new Error("Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const res = await updateUser(formDataUpload);
      if (!res) throw new Error("Image upload failed");

      setFormData((prev) => ({
        ...prev,
        profilePic: res.avatar,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        <div className="rounded-4xl border border-black/10 bg-gray-50 p-6 shadow-sm sm:p-8 lg:p-10">
          <h2 className="mb-8 text-3xl font-medium tracking-tight sm:text-4xl">
            Edit Profile
          </h2>

          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            {/* Left Column */}
            <section className="flex flex-col items-start">
              <img
                src={profilePicSrc}
                alt="Profile"
                className="h-52 w-52 rounded-[28px] object-cover border bg-white"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-5"
              />

              {/* Username */}
              <div className="mt-6 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Name</p>
                {editingField === "username" ? (
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={() => handleBlur("username")}
                    autoFocus
                    className="mt-1 w-full bg-transparent outline-none"
                  />
                ) : (
                  <p
                    onClick={() => setEditingField("username")}
                    className="mt-1 text-base font-medium cursor-pointer"
                  >
                    {formData.username || "Click to add name"}
                  </p>
                )}
              </div>
            </section>

            {/* Right Column */}
            <section className="space-y-4">
              {/* Email */}
              <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
                <p className="text-sm text-black/50">Email</p>
                {editingField === "email" ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    autoFocus
                    className="mt-1 w-full bg-transparent outline-none"
                  />
                ) : (
                  <p
                    onClick={() => setEditingField("email")}
                    className="mt-1 text-base font-medium cursor-pointer"
                  >
                    {formData.email || "Click to add email"}
                  </p>
                )}
              </div>

              {/* Logout / Delete */}
              <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                <button
                  className="rounded-full border-2 cursor-pointer border-red-500 bg-red-500/10 hover:bg-red-500 px-8 py-3 text-sm font-semibold text-red-500 hover:text-white duration-150"
                >
                  Delete Account
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-full bg-black/10 hover:bg-black/20 cursor-pointer px-8 py-3 text-sm font-semibold text-black duration-150"
                >
                  Logout
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;