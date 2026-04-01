import Navbar from "../../components/NavBar/Navbar"

const AdminDashboard = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold mt-10 ml-6 mb-5">Welcome to the Admin Dashboard</h1>
      <div className = "flex-col">
        <div className = "flex ml-1">
          <div className="w-full h-40 bg-amber-200 mx-3 my-3 rounded-2xl shadow"></div>
        </div>
        <div className = "flex">
          <div className="w-3/5 h-75 bg-amber-200 m-3 rounded-2xl shadow"></div>
          <div className="w-2/5 h-75 bg-amber-200 m-3 rounded-2xl shadow"></div>
        </div>
        <div className = "flex">
          <div className="w-full h-90 bg-amber-200 m-3 rounded-2xl shadow"></div>
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard