import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [countNotifications, SETCountNotifications] = useState(0);
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="navmenu menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-orange-500 text-white rounded-box "
            >
              <li>
                <NavLink to="/">Homepage</NavLink>
              </li>
              <li>
                <NavLink to="/">Products</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center">
          <h1 className="text-orange-600 text-2xl font-bold">WPconverter</h1>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {/* Hide login/signup buttons on small screens */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink
              to="/login"
              className="login btn bg-orange-600 text-white rounded-xl text-sm"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="signup btn bg-orange-600 text-white rounded-xl text-sm"
            >
              Signup
            </NavLink>
          </div>
          <button className="btn btn-ghost btn-circle lg:me-3 mx-2">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs bg-orange-600 indicator-item text-white">
                {countNotifications}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
