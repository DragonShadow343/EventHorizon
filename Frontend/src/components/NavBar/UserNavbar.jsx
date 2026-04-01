import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-blue-500" : "text-gray-700"
  } hover:text-blue-500`;

const UserNavbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border border-gray-200 bg-white px-16 py-5 shadow-sm">
      <NavLink to="/user/dashboard">
        <h1 className="text-2xl font-semibold text-gray-900">
          EventHorizon
        </h1>
      </NavLink>

      <div className="flex items-center gap-8">
        <NavLink to="/user/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/events/create" className={navLinkClass}>
          Create Event
        </NavLink>
        <NavLink to="/events" className={navLinkClass}>
          My Events
        </NavLink>
        <NavLink to="/user/settings" className={navLinkClass}>
          My Account
        </NavLink>
      </div>
    </nav>
  );
};

export default UserNavbar;