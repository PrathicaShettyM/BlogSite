import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful!');
      setTimeout(() => {
        window.location.href = '/blogs';
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed.');
    }
  };

  const handleGoogleLogin = () => {
    window.open('http://localhost:5012/api/auth/google', '_self');
  };

  // ✅ Handle Google login via URL query params
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const googleStatus = query.get('google');

    if (googleStatus === 'success') {
      const token = query.get('token');
      const userStr = query.get('user');

      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(`Google login successful. Welcome, ${user.name}!`);

        const needsUpdate =
          user.bio?.includes('Update') || user.location === 'Not specified';

        setTimeout(() => {
          if (needsUpdate) {
            toast.info("Please update your profile.");
            window.location.href = '/profile';
          } else {
            window.location.href = '/blogs';
          }
        }, 1500);
      } catch (err) {
        toast.error('Failed to process Google login. Please try again.');
      }
    }

    if (googleStatus === 'fail') {
      toast.error('Google login failed. Please try again.');
    }

    // ✅ Clean up the URL
    if (googleStatus) {
      window.history.replaceState(null, '', '/login');
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">Login to Blog</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
        >
          {/* Email Input */}
          <div className="flex items-center border border-gray-600 bg-gray-800 p-2 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full text-white outline-none placeholder-gray-400 autofill:bg-gray-800"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-600 bg-gray-800 p-2 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className="bg-transparent w-full text-white outline-none placeholder-gray-400 autofill:bg-gray-800"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center gap-2 bg-white text-black py-2 rounded-lg hover:opacity-90"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
