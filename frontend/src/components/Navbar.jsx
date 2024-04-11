import React from 'react';
import { Link } from 'react-router-dom';
import { useUserSession } from '../hooks/useUserSession';

const Navbar = () => {
  // Function to get user role from local storage
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();

  const role = userSession.role;

  return (
    <div>
      <div className="navbar bg-yellow-500 pb-3 fixed">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {role === 'admin' && (
                <li>
                  <Link to="/createEvent">
                    <a>Register Event</a>
                  </Link>
                </li>
              )}
              <li>
                <a>Events</a>
                <ul className="p-2">
                  <li>
                    <Link to="/upcoming-events">
                      <a>Upcoming</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/past-events">
                      <a>Past</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/join-rso">
                  <a>Join RSO</a>
                </Link>
              </li>
              <li>
                <Link to="/register-public-event">
                  <a>Register Public Event</a>
                </Link>
              </li>
              {role === 'admin' && (
                <li>
                  <Link to="/register-rso">
                    <a>Register RSO</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link to={'/'}>
            <button className="btn btn-ghost text-xl">Knights Events</button>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {role === 'admin' && (
              <li>
                <Link to="/createEvent">
                  <button>Register Event</button>
                </Link>
              </li>
            )}
            <li>
              <details>
                <summary>Events</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/upcoming-events">
                      <a>Upcoming</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/past-events">
                      <a>Past Events</a>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/join-rso">
                <button>Join RSO</button>
              </Link>
            </li>
            <li>
              <Link to="/register-public-event">
                <button>Register Public Event</button>
              </Link>
            </li>
            {role === 'admin' && (
              <li>
                <Link to="/register-rso">
                  <button>Register RSO</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/home">
            <button className="btn">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
