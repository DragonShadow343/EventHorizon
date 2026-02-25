import React from 'react'
import { NavLink } from 'react-router'

const Navbar = ({className}) => {
  return (
    <>
        <nav className={`flex shadow-xl h-20 w-screen mx-auto px-20 items-center justify-between ${className}`}>

            <NavLink to="/">
              <h1 className='text-2xl'>EventHorizon</h1>
            </NavLink>
            <ul className='flex gap-x-15'>
                <li>
                  <NavLink to="/events" className={({isActive}) => `cursor-pointer ${isActive? "underline": ""}`}>
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className={({isActive}) => `cursor-pointer ${isActive? "underline": ""}`}>
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className={({isActive}) => `cursor-pointer ${isActive? "underline": ""}`}>
                    Login
                  </NavLink>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar