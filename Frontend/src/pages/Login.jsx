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
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="order-1 flex flex-1 flex-col px-4 py-8 sm:px-8 lg:order-2 lg:p-12">

          <NavLink to="/" className="mb-4 text-base no-underline sm:text-[1.2rem]">← Back</NavLink>

          <h1 className="my-8 text-center text-2xl sm:my-12 sm:text-3xl lg:mb-16 lg:mt-12 lg:text-[1.7em]">
            Login to Your Account
          </h1>

          {errors.creds && (<p className="-mt-2 mb-2 text-[0.9em] text-red-600">{errors.creds}</p>)}
          <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-4 lg:max-w-none lg:w-1/2">
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

            <button type="submit" className="mt-6 w-full cursor-pointer rounded-lg bg-blue-400 p-3 text-white duration-150 hover:bg-blue-500 sm:mt-10 sm:w-auto sm:self-center sm:px-10">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-[0.9em]">
            Don't have an account? <NavLink to="/signup">Sign up here</NavLink>
          </p>
        </div>
        <div className="order-2 flex flex-1 lg:h-full shrink-0 p-4 sm:h-48 lg:order-1 lg:self-stretch lg:p-10">
          <div className="h-full w-full rounded-2xl bg-blue-400 lg:min-h-0 lg:rounded-3xl" />
        </div>
      </div>
    </>
  );
};

export default Login;