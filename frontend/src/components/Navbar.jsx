import React from "react";
import { Link } from "react-router-dom";
import { useUserSession } from "../hooks/useUserSession";

const Navbar = () => {
  // Function to get user role from local storage
  const getUserRole = () => {
    const userSession = localStorage.getItem("userSession");
    return userSession ? JSON.parse(userSession).role : null;
  };

  const role = getUserRole();
  console.log("Role:", role);

  const doLogout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <div className="navbar bg-yellow-500 pb-3 fixed bg-opacity-100" style={{zIndex: 100}}>
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
              {role && (
                <li>
                  <Link to="/createEvent">
                    <a>Register Event</a>
                  </Link>
                </li>
              )}
              {role && (
                <li>
                  <Link to="/myRSO">
                    <button>MyRSO</button>
                  </Link>
                </li>
              )}
              {role && (
                <li>
                  <Link to="/joinRSO">
                    <button>JoinRSO</button>
                  </Link>
                </li>
              )}
              {role && (
                <Link to={"/registerRSO"}>
                  <li>
                    <button>Register RSO</button>
                  </li>
                </Link>
              )}
              {role === "super admin" && (
                <Link to={"/UniversityProfile"}>
                  <li>
                    <button>University Profile</button>
                  </li>
                </Link>
              )}
              {role && (
                <Link to={"/"}>
                  <li>
                    <button>Logout</button>
                  </li>
                </Link>
              )}

              {!role && (
                <Link to={"/"}>
                  <li>
                    <button>Login</button>
                  </li>
                </Link>
              )}
            </ul>
          </div>
          {/* <Link to={'/'}> */}
          <div className=" ps-3 text-xl">Knights Events</div>
          {/* </Link> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {role && (
              <li>
                <Link to="/createEvent">
                  <button>Register Event</button>
                </Link>
              </li>
            )}

            {role && (
              <li>
                <Link to="/myRSO">
                  <button>MyRSO</button>
                </Link>
              </li>
            )}

            {role && (
              <li>
                <Link to="/joinRSO">
                  <button>JoinRSO</button>
                </Link>
              </li>
            )}

            {role && (
              <Link to={"/registerRSO"}>
                <li>
                  <button>Register RSO</button>
                </li>
              </Link>
            )}
            {role === "super admin" && (
              <Link to={"/UniversityProfile"}>
                <li>
                  <button>University Profile</button>
                </li>
              </Link>
            )}
            {role && (
              <Link to={"/"}>
                <li>
                  <button onClick={doLogout}>Logout</button>
                </li>
              </Link>
            )}

            {!role && (
              <Link to={"/"}>
                <li>
                  <button>Login</button>
                </li>
              </Link>
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
