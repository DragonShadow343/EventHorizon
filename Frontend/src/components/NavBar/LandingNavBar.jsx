import { NavLink } from "react-router-dom"

const HomeNavBar = ({className}) => {

  return (
    <>
        <nav className={`flex shadow-xl h-20 w-3/5 mx-auto my-15 px-10 items-center justify-between rounded-full ${className}`}>

            <NavLink to="/">
              <h1 className='text-2xl'>EventHorizon</h1>
            </NavLink>
            <ul className='flex gap-x-5'>
                <li>
                  <NavLink to="/events">
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login">
                    Login
                  </NavLink>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default HomeNavBar