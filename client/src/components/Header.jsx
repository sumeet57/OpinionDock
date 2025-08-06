import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/user.context.jsx"; // Adjust path as needed

const Header = () => {
  // Context to manage user profile
  const { user } = useContext(userContext);
  const [profile, setProfile] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : "Guest",
  });
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full h-fit z-50 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
            OpinionDock.
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl text-white hover:bg-white hover:bg-opacity-10 hover:text-pink-200 transition font-medium"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl text-white hover:bg-white hover:bg-opacity-10 hover:text-pink-200 transition font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="px-4 py-2 rounded-xl text-white hover:bg-white hover:bg-opacity-10 hover:text-pink-200 transition font-medium"
          >
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-xl hover:bg-white hover:bg-opacity-10 transition"
          aria-label="Open menu"
        >
          <svg
            className="w-8 h-8 text-white hover:text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 bg-opacity-95 z-50 flex flex-col shadow-2xl animate-slide-in">
          <div className="flex justify-between items-center px-6 py-5 border-b border-white border-opacity-20">
            <span className="text-xl font-bold text-white">
              {profile?.name || "Guest"}
            </span>
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-xl hover:bg-white hover:bg-opacity-10 transition"
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center mt-10 gap-8">
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="w-4/5 text-white text-lg font-semibold py-3 rounded-3xl text-center shadow hover:text-pink-200 hover:bg-white hover:bg-opacity-10 transition"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={toggleMobileMenu}
              className="w-4/5 text-white text-lg font-semibold py-3 rounded-3xl text-center shadow hover:text-pink-200 hover:bg-white hover:bg-opacity-10 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              onClick={toggleMobileMenu}
              className="w-4/5 text-white text-lg font-semibold py-3 rounded-3xl text-center shadow hover:text-pink-200 hover:bg-white hover:bg-opacity-10 transition"
            >
              Profile
            </Link>
          </div>
        </div>
      )}

      {/* Animation for mobile menu */}
      <style>
        {`
                    @keyframes slide-in {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    .animate-slide-in {
                        animation: slide-in 0.3s cubic-bezier(.4,0,.2,1);
                    }
                `}
      </style>
    </nav>
  );
};

export default Header;
