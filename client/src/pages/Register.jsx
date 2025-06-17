import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPenNib } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', location: '', bio: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', form);
      toast.success('Registration successful. Please login.');
      setForm({ name: '', email: '', password: '', location: '', bio: '' });
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Registration failed.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5012/api/auth/google';
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-4 text-blue-400">Create an Account</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4 text-white">
          {['name', 'email', 'password', 'location', 'bio'].map((field, idx) => {
            const icons = [FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPenNib];
            const Icon = icons[idx];
            const type = field === 'password' ? 'password' : 'text';
            const placeholderMap = {
              name: 'Full Name',
              email: 'Email Address',
              password: 'Password',
              location: 'Location',
              bio: 'Short Bio (10-100 chars)'
            };
            return (
              <div key={field} className="flex items-center border-b border-gray-600 p-2 focus-within:ring-2 focus-within:ring-blue-400 rounded-md">
                <Icon className="text-gray-400 mr-2" />
                <input
                  type={type}
                  name={field}
                  placeholder={placeholderMap[field]}
                  required
                  value={form[field]}
                  onChange={handleChange}
                  className="bg-transparent w-full text-white outline-none placeholder-gray-400 autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_#0f172a] autofill:text-white text-white"
                />
              </div>
            );
          })}
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300 cursor-pointer">
            Register
          </button>
          <button type="button" onClick={handleGoogleLogin} className="w-full flex justify-center items-center gap-2 bg-white text-black py-2 rounded-lg hover:opacity-90 cursor-pointer dark:bg-gray-700 dark:text-white">
            <FcGoogle size={20} /> Continue with Google
          </button>
        </form>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick pauseOnHover theme="dark" />
    </>
  );
};

export default Register;
