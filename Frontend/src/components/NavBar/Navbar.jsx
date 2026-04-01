import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navConfig = {
  guest: [
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" },
  ],
  user: [
    { label: "Dashboard", path: "/user/dashboard" },
    { label: "Events", path: "/events" },
    { label: "Create Event", path: "/user/events/create" },
    { label: "My Events", path: "/user/my-events" },
    { label: "Settings", path: "/user/settings" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Reports", path: "/admin/reports" },
    { label: "Events", path: "/events" },
    { label: "Create Event", path: "/user/events/create" },
    { label: "Users", path: "/admin/user" },
    { label: "Settings", path: "/admin/settings" },
  ]
}

const Navbar = ({className}) => {

  const { user } = useAuth();
  const role = user?.role || "guest" ;
  const links = navConfig[role] || [];

  const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-blue-500" : "text-gray-700"
  } hover:text-blue-500`;

  return (
    <>
        <nav className={`flex shadow-xl h-20 w-full px-16 items-center justify-between ${className}`}>

            <NavLink to="/">
              <h1 className='text-2xl'>EventHorizon</h1>
              {role === "admin" && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  Admin
                </span>
              )}
            </NavLink>
            
            <ul className='flex gap-x-8 items-center'>
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} end={link.path === "/"} className={navLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
        </nav>
    </>
  )
}

export default Navbar