import { Link } from "react-router-dom"

const HomeNavBar = ({className}) => {
  return (
    <>
        <nav className={`flex shadow-xl h-20 w-3/5 mx-auto my-15 px-10 items-center justify-between rounded-full ${className}`}>

            <Link to="/">
              <h1 className='text-2xl'>EventHorizon</h1>
            </Link>
            <ul className='flex gap-x-5'>
                <li className='cursor-pointer'>
                  <Link to="/events">
                    Events
                  </Link>
                </li>
                <li className='cursor-pointer'>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li className='cursor-pointer'>
                  <Link to="/login">
                    Login
                  </Link>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default HomeNavBar