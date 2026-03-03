import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    return regex.test(email);
  };

const validatePassword = (password) => {
  return {
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[!@#$%^&*]/.test(password),
    hasMinLength: password.length >= 8,
  };
};

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordCheck = validatePassword(password);

    const newErrors = {};

    if (!email) {
      newErrors.email = "Please enter your email address";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Please enter your password";
    } else if (!passwordCheck.hasUpperCase) {
      newErrors.password =
        "Password must include 1 uppercase letter.";
    } else if (!passwordCheck.hasNumber) {
      newErrors.password =
        "Password must include 1 number.";
    } else if (!passwordCheck.hasSymbol) {
      newErrors.password =
        "Password must include 1 symbol.";
    } else if (!passwordCheck.hasMinLength) {
      newErrors.password = "Password must be at least 8 characters long.";
    } 
 
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) { 
        return;
    }
  };

  return (
    <>
      <Navbar />

      {/* .login-container */}
      <div className="flex h-screen">
        {/* .login-left */}
        <div className="flex-1 bg-gray-300"></div>

        {/* .login-right */}
        <div className="flex flex-1 flex-col p-12">

          <Link to="/" className="mb-4 text-[1.2rem] no-underline">← Back</Link>

          <h1 className="mt-20 mb-20 text-center text-[1.7em]">Login to Your Account</h1>

          <form onSubmit={handleSubmit} className="mx-auto flex w-1/2 flex-col gap-4">
            <input
              className="p-3 text-base" 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="-mt-2 mb-2 text-[0.9em] text-red-600">{errors.email}</p>
            )}

            <input
              className="p-3 text-base"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="-mt-2 mb-2 text-[0.9em] text-red-600">{errors.password}</p>
            )}

            <button type="submit" className="bg-blue-500 text-white p-3 rounded">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-[0.9em]">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;