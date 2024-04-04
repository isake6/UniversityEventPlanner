import React from 'react';
import { Link } from 'react-router-dom';
import CreateEventForm from './CreateEventForm';

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-yellow-500 pb-3 fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabindex="0" role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabindex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Register Event</a>
              </li>
              <li>
                <a>Events</a>
                <ul className="p-2">
                  <li>
                    <a>Upcoming</a>
                  </li>
                  <li>
                    <a>Past</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Register RSO</a>
              </li>
            </ul>
          </div>
          <Link to={'/'}>
            <button className="btn btn-ghost text-xl">Knights Events</button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={'/createEvent'}>
                <button>Register Event</button>
              </Link>
            </li>
            <li>
              <details>
                <summary>Events</summary>
                <ul className="p-2">
                  <li>
                    <a>Upcoming</a>
                  </li>
                  <li>
                    <a>Past Events</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <button></button>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Home</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
