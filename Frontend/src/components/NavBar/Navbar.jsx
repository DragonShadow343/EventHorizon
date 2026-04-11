import React, { useMemo, useState } from 'react'
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = useMemo(() => navConfig[role] || [], [role]);

  const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive ? "text-blue-500" : "text-gray-700"
  } hover:text-blue-500`;

  return (
    <>
        <nav className={`relative z-50 w-full`}>
          <div className="relative z-60 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-4 shadow-sm sm:px-6 lg:px-12">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <h1 className='text-lg font-semibold sm:text-2xl'>EventHorizon</h1>
              {role === "admin" && (
                <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600">
                  Admin
                </span>
              )}
            </NavLink>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
            
            <ul className='hidden items-center gap-x-8 md:flex'>
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} end={link.path === "/"} className={navLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            </div>
          </div>

          {mobileOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-55 bg-slate-950/30 md:hidden"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              />
              <div
                id="mobile-nav-menu"
                className="absolute left-0 right-0 top-full z-70 max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto border-b border-slate-200/80 bg-white shadow-lg md:hidden"
              >
                <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
                  <ul className="grid gap-1 p-2">
                    {links.map((link) => (
                      <li key={link.path}>
                        <NavLink
                          to={link.path}
                          end={link.path === "/"}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                              isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                            }`
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </nav>
    </>
  )
}

export default Navbar