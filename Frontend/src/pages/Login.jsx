import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar'
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
    } else {
      // Handle login logic here
      console.log('Logging in with:', { email, password });
      setError('');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {/* LEFT SIDE */}
        <div className="login-left">
          {/* Placeholder for image or design */}
          </div>

          {/* RIGHT SIDE */}
          <div className="login-right">
            <Link to="/" className="back-arrow">← Back</Link>

            <h1>Login to Your Account</h1>

            {error && <p className="error">{error}</p>} 

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </form>

            <p className="signup-link">
              Don't have an account?{" "} 
              <Link to="/signup">Sign up here</Link>
            </p>
          </div>
      </div>
    </>
  );
};

export default Login