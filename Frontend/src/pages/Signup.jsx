import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const profilePicSrc = profilePic ? URL.createObjectURL(profilePic) : null;
  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
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
      newErrors.password = "Password must include 1 uppercase letter.";
    } else if (!passwordCheck.hasNumber) {
      newErrors.password = "Password must include 1 number.";
    } else if (!passwordCheck.hasSymbol) {
      newErrors.password = "Password must include 1 symbol.";
    } else if (!passwordCheck.hasMinLength) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (password !== rePassword) {
      newErrors.rePassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    } else {
      try {
        const formDataSubmit = new FormData();
        formDataSubmit.append('name', name);
        formDataSubmit.append('email', email);
        formDataSubmit.append('password', password);
        if (profilePic) formDataSubmit.append('image', profilePic);

        await register(formDataSubmit);
        navigate("/login");
      } catch (err) {
        setErrors({ email: err.message });
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* LEFT SIDE */}
      <div className="h-full relative flex-1 flex flex-col justify-center p-12">
        <NavLink to="/" className="absolute top-10 left-10">← Back</NavLink>
        <h1 className='text-3xl mb-5 text-center'>Sign Up</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96 mx-auto my-10'>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className='p-3 border rounded-lg'
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            className='p-3 border rounded-lg'
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            className='p-3 border rounded-lg'
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input
            type="password"
            placeholder="Re-type password"
            value={rePassword}
            className='p-3 border rounded-lg'
            onChange={(e) => setRepassword(e.target.value)}
          />
          {errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}

          {/* Image upload shown only if all fields are filled */}
          {name && email && password && (
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium">Profile Picture</label>
              {profilePicSrc && (
                <img
                  src={profilePicSrc}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          )}

          <button type="submit" className='p-3 mx-10 mt-6 cursor-pointer rounded-lg bg-blue-400 hover:bg-blue-500 duration-150 text-white'>
            Sign Up
          </button>
        </form>

        <p className="text-center">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-400 hover:text-blue-500 duration-150 hover:underline">Log in here</NavLink>
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 p-10">
        <div className='w-full h-full bg-blue-400 rounded-3xl'></div>
      </div>
    </div>
  );
};

export default Signup;