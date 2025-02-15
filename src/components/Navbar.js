import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div className="text-xl font-bold">
        <Link to="/">Task Manager</Link>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-1 rounded border bg-gray-800 hover:bg-gray-700"
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button
              onClick={() => auth.signOut()}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
