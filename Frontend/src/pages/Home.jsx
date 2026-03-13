import React from 'react'
import LandingNavBar from './../components/NavBar/LandingNavBar'
import {NavLink} from 'react-router-dom'

const Home = () => {
  return (
    <>
        <LandingNavBar className={""}/>

      <div className='flex mx-auto w-fit gap-x-4'>
        <div className='p-10 w-fit'>
          <h3 className='font-extrabold'>Admin Pages</h3>
          <p>Swap with "admin" to access admin routes in <span className='font-mono text-sm bg-gray-200 rounded-sm px-2'>./src/context/AuthContext.jsx</span></p>
          <ul className='list-disc'>
            <li>
              <NavLink to="/admin/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/admin/reports">Reports Page</NavLink>
            </li>
            <li>
              <NavLink to="/admin/reportdetails">Report Details Page</NavLink>
            </li>
            <li>
              <NavLink to="/admin/user">Active Users Page</NavLink>
            </li>
            <li>
              <NavLink to="/admin/userdetails">User Details Page</NavLink>
            </li>
            <li>
              <NavLink to="/admin/settings">Settings Page</NavLink>
            </li>
          </ul>
        </div>
        <div className='p-10 w-fit'>
          <h3 className='mb-4 font-extrabold'>User Pages</h3>
          <ul className='list-disc'>
            <li>
              <NavLink to="/user/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/user/settings">Settings Page</NavLink>
            </li>
          </ul>
        </div>
        <div className='p-10 w-fit'>
          <h3 className='mb-4 font-extrabold'>Event Pages</h3>
          <ul className='list-disc'>
            <li>
              <NavLink to="/events">Events Page</NavLink>
            </li>
            <li>
              <NavLink to="/events/create">Create Event Page</NavLink>
            </li>
            <li>
              <NavLink to="/events/eventdetails">Event Details</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Home