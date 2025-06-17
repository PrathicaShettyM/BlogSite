import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
     <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-blue-400 cursor-pointer" onClick={() => navigate('/')}>Blog App</h1>
      
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm flex items-center gap-2">
            Welcome, <strong>{user.name}</strong>
            {user.googleId && (
            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-semibold">
            Google User
            </span>
  )}
</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="text-sm text-blue-400 hover:underline">Login</button>
          <button onClick={() => navigate('/register')} className="text-sm text-blue-400 hover:underline">Register</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;