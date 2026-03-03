import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/NavBar/Navbar';
import './Login.css';

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
    } else {
      newErrors.email = "";
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
    } else {
      newErrors.password = "";
    }
 
    setErrors(newErrors);
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-left"></div>

        <div className="login-right">
          <Link to="/" className="back-arrow">← Back</Link>

          <h1>Login to Your Account</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}

            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;