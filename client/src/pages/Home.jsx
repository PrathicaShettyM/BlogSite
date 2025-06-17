import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FcGoogle } from 'react-icons/fc';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white flex flex-col">
      <Navbar />
      <section className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-400">Express Yourself, Boldly</h2>
        <p className="max-w-2xl text-gray-300 mb-6 text-lg">
          Dive into a world of stories, opinions, and inspiration. Read or write impactful blogs that matter.
        </p>
        <Link to="/register" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white font-semibold rounded-lg transition">
          Get Started
        </Link>
      </section>

      <section className="bg-gray-900 px-6 py-12">
        <h3 className="text-3xl text-center font-bold text-blue-300 mb-10">🔥 Trending Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((blog) => (
            <div key={blog} className="bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition duration-300">
              <h4 className="text-xl font-bold text-blue-300 mb-2">Blog Title {blog}</h4>
              <p className="text-gray-300 text-sm">
                Explore ideas that shape the world. Insightful writing from diverse minds.
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
