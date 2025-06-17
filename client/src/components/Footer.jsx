import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 text-gray-400 text-sm text-center py-6 mt-auto">
      <p>&copy; {new Date().getFullYear()} BlogSite. All rights reserved.</p>
    </footer>
  );
};

export default Footer;