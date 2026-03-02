import { NavLink } from 'react-router'
import Navbar from '../components/NavBar/Navbar'

const Signup = () => {
  return (
    <>
      <Navbar />
      <head>
        <title className='text-2xl border-l-2'>Sign Up</title>
      </head>
      <body className='bg-gray-100 scroll-smooth'>
        <div className='float-left w-1/2'>
          <h1 className='text-5xl text-center p-4 font-bold mt-35 mb-15'>Sign Up</h1>
          <input type="text" placeholder="Username" className='p-2 w-60 block mx-auto  border-gray border-1 rounded-2xl my-5 bg-gray-200'/>
          <input type="email" placeholder="Email" className='p-2 w-60 block mx-auto border-gray border-1 rounded-2xl my-5 bg-gray-200'/>
          <input type="password" placeholder="Password" className='p-2 w-60 block mx-auto border-gray border-1 rounded-2xl my-5 bg-gray-200'/>
          <button className='bg-blue-950 rounded-2xl text-white font-semibold p-2 w-32 block mx-auto mt-8'>Sign Up</button>
          <button className='bg-sky-700 rounded-2xl text-white font-semibold p-2 w-32 block mx-auto mt-2'><NavLink to="/login">Log In</NavLink></button>
        </div>
        <figure>
          <img src="" alt="Image place holder" className='float-right w-1/2'/>
        </figure>
      </body>
    </>
  )
}

export default Signup