import { useState } from 'react';
import { NavLink } from 'react-router';
import Navbar from '../components/NavBar/Navbar';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
    } else {
      // Handle signup logic here
      console.log('Signing up with:', { email, password });
      setError('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-80px)]">
        {/* LEFT SIDE */}
        <div className="flex-1 p-10">
          <div className='w-full h-full bg-blue-400 rounded-3xl'>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="h-full relative flex-1 flex flex-col justify-center p-12">
          <NavLink to="/" className="absolute top-10 left-10">← Back</NavLink>

          <h1 className='text-3xl mb-5 text-center'>Sign Up</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96 mx-auto my-10'>
            <input
              type="email"
              placeholder="Email"
              value={email}
              className='p-3 border rounded-lg'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              className='p-3 border rounded-lg'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='p-3 mx-10 mt-10 cursor-pointer rounded-lg bg-blue-400 hover:bg-blue-500 duration-150 text-white'>Sign Up</button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-400 hover:text-blue-500 duration-150 hover:underline">Log in here</NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup