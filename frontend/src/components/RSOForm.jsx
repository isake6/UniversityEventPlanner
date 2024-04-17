import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useUserSession } from "../hooks/useUserSession";
//# Input: user1_email, user2_email, user3_email, user4_email, user5_email, admin_email, name, university_id
// //if (password !== passwordConfirm) {
//     console.error('Passwords do not match');
//     return;
//   }

const RSOForm = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();

  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted. Awaiting response...");

    const user1_email = document.getElementById("user1").value;
    const user2_email = document.getElementById("user2").value;
    const user3_email = document.getElementById("user3").value;
    const user4_email = document.getElementById("user4").value;
    const user5_email = document.getElementById("user5").value;
    const admin_email = document.getElementById("admin").value;
    const name = document.getElementById("name").value;
    const university_id = userSession.university_id;

    const users = [
      user1_email,
      user2_email,
      user3_email,
      user4_email,
      user5_email,
    ];

    if (!users.includes(admin_email)) {
      console.error("Admin email not in users list");
      return;
    }

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/add_rso",
        {
          user1_email,
          user2_email,
          user3_email,
          user4_email,
          user5_email,
          admin_email,
          name,
          university_id,
        },
        { withCredentials: true }
      );
      console.log("Response:", response.data);

      // redirect to login page
      if (!response.error) {
        window.location.href = "/myRSO";
      }
    } catch (error) {
      // Log the error message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error message:", error.response.data);
        setMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  const handleChange = async () => {
    setMessage("");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center h-screen pt-28">
        <div className="w-1/3 h-fit max-w-xl m-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black">
              Create RSO
            </h1>
            <p className="text-center font-bold">
              Admin email must match 1 of the 5 emails listed
            </p>
            <form onSubmit={handleSubmit}>
              <h3 className="text-base font-bold pt-3 text-gray-600">
                RSO Name
              </h3>
              <input
                type="text"
                id="name"
                placeholder=""
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Email #1
              </h3>
              <input
                type="text"
                id="user1"
                placeholder=""
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Email #2
              </h3>
              <input
                type="text"
                id="user2"
                placeholder=""
                className=" w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Email #3
              </h3>
              <input
                type="text"
                id="user3"
                placeholder=""
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Email #4
              </h3>
              <input
                type="text"
                id="user4"
                placeholder=""
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Email #5
              </h3>
              <input
                type="text"
                id="user5"
                placeholder=""
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Admin Email
              </h3>
              <input
                type="text"
                id="admin"
                placeholder=""
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              {message && (
                <div
                  className="pt-4 text-center font-bold"
                  style={{ color: "red" }}
                >
                  {message}
                </div>
              )}

              <div className=" w-full py-6 flex flex-col m-auto">
                <button
                  type="submit"
                  className="btn btn-info font-bold text-lg bg-yellow-500"
                >
                  Register RSO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSOForm;
