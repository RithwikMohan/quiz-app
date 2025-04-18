// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold">High-End Quiz</div>
      <ul className="list-none p-0 m-0 flex">
        <li className="ml-6">
          <Link to="/" className="text-gray-300 hover:text-gray-100 font-semibold transition duration-300">Home</Link>
        </li>
        <li className="ml-6">
          <Link to="/quiz" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">Start Quiz</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;