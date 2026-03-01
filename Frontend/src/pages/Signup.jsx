import Navbar from '../components/NavBar/Navbar'

const Signup = () => {
  return (
    <>
      <Navbar />
      <head>
        <title className='text-2xl border-l-2'>Sign Up</title>
      </head>
      <body className='bg-white scroll-smooth'>
        <div className='float-left w-1/2'>
          <h1 className='text-4xl text-center p-4 font-bold'>Sign Up</h1>
          <input type="text" placeholder="Username" className='p-2 w-full'/>
          <input type="email" placeholder="Email" className='p-2 w-full'/>
          <input type="password" placeholder="Password" className='p-2 w-full'/>
          <button className='bg-blue-950 rounded text-white p-2 w-1/2'>Sign Up Here</button>
        </div>
        <figure>
          <img src="" alt="Image place holder" className='float-right w-1/2'/>
        </figure>
      </body>
    </>
  )
}

export default Signup