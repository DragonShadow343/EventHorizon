import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router";
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
    const token = localStorage.getItem("accessToken");
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Settings</h2>

        <div className="bg-white shadow rounded-xl p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <img
              src={profilePicSrc}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />

            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Picture
              </label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            {editingField === "username" ? (
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={() => handleBlur("username")}
                autoFocus
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <div
                onClick={() => setEditingField("username")}
                className="w-full border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {formData.username || "Click to add username"}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            {editingField === "email" ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                autoFocus
                className="w-full border rounded-lg px-3 py-2"
              />
            ) : (
              <div
                onClick={() => setEditingField("email")}
                className="w-full border rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {formData.email || "Click to add email"}
              </div>
            )}
          </div>

          {/* Logout */}
          <div className="pt-4 border-t">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSettings;