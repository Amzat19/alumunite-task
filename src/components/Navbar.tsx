import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          AlumUnite
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-blue-300">
            Home
          </Link>
          <Link to="/add-user" className="text-white hover:text-blue-300">
            Add User
          </Link>
          <Link to="/coming-soon" className="text-white hover:text-blue-300">
            Manage Users
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-blue-500 p-4`}
      >
        <Link to="/" className="block text-white py-2" onClick={toggleMenu}>
          Home
        </Link>
        <Link
          to="/add-user"
          className="block text-white py-2"
          onClick={toggleMenu}
        >
          Add User
        </Link>
        <Link
          to="/coming-soon"
          className="block text-white py-2"
          onClick={toggleMenu}
        >
          Manage Users
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
