import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 

  const navigate = useNavigate();

  const { loginAs } = useAuth();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = "Please enter your email address";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Please enter your password";
    }
    
    if (Object.keys(newErrors).length > 0) { 
      return;
    } else {
      const loggedInUser = await loginAs(email, password);
      if (loggedInUser?.role === "user") {
        navigate("/user/dashboard");
      } else if (loggedInUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else{
        newErrors.creds = "Invalid credentials";
      }
    }

    setErrors(newErrors);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1 p-10">
          <div className='w-full h-full bg-blue-400 rounded-3xl'></div>
        </div>
        <div className="flex flex-1 flex-col p-12">

          <NavLink to="/" className="mb-4 text-[1.2rem] no-underline">← Back</NavLink>

          <h1 className="mt-20 mb-20 text-center text-[1.7em]">Login to Your Account</h1>

          {errors.creds && (<p className="-mt-2 mb-2 text-[0.9em] text-red-600">{errors.creds}</p>)}
          <form onSubmit={handleSubmit} className="mx-auto flex w-1/2 flex-col gap-4">
            <input
              className="p-3 border rounded-lg" 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (<p className="-mt-2 mb-2 text-[0.9em] text-red-600">{errors.email}</p>)}

            <input
              className="p-3 border rounded-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="-mt-2 mb-2 text-[0.9em] text-red-600">{errors.password}</p>
            )}

            <button type="submit" className="p-3 mx-10 mt-10 cursor-pointer rounded-lg bg-blue-400 hover:bg-blue-500 duration-150 text-white">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-[0.9em]">
            Don't have an account? <NavLink to="/signup">Sign up here</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;