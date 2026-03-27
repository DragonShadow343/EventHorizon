import AdminNavBar from "../../components/NavBar/AdminNavbar"

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavBar />
      <h1 className="text-3xl font-bold mt-10 ml-6 mb-5">Welcome to the Admin Dashboard</h1>
      <div className = "flex-col">
        <div className = "flex">
          <div className="w-2/3 h-60 bg-amber-200 m-4 rounded-2xl shadow"></div>
          <div className="w-1/3 h-60 bg-amber-200 m-4 rounded-2xl shadow"></div>
        </div>
        <div className = "flex">
          <div className="w-full h-90 bg-amber-200 m-4 rounded-2xl shadow"></div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard