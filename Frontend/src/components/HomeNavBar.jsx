import React from 'react'

const HomeNavBar = ({className}) => {
  return (
    <>
        <nav className='flex shadow-xl h-20 w-3/5 mx-auto my-15 px-10 items-center justify-between rounded-full'>
            <h1 className='text-2xl'>EventHorizon</h1>
            <ul className='flex gap-x-5'>
                <li className='cursor-pointer'>Events</li>
                <li className='cursor-pointer'>Sign Up</li>
                <li className='cursor-pointer'>Login</li>
            </ul>
        </nav>
    </>
  )
}

export default HomeNavBar