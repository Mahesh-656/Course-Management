import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(Auth);

  return (
    <nav className="bg-slate-900 px-10 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-cyan-400">
        CourseHub
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 text-slate-200 font-medium">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Courses
        </Link>

        {user?.role === "admin" && (
          <Link to="/add" className="hover:text-cyan-400 transition-colors">
            Add Course
          </Link>
        )}

        <Link to="/cart" className="hover:text-cyan-400 transition-colors">
          Cart
        </Link>

        {/* {user && (
          <Link to="/update" className="hover:text-cyan-400 transition-colors">
            Update
          </Link>
        )} */}

        {/* Auth Buttons */}
        {user ? (
          <button
            onClick={logout}
            className="ml-4 px-4 py-1.5 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-all"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="ml-4 px-4 py-1.5 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-all"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-1.5 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
