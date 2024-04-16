import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useUserSession } from "../hooks/useUserSession";
import MyMap from "./Map";

const EditRsoEventForm = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [message, setMessage] = useState("");
  const [pressetLat, setPresetLat] = useState(0);
  const [pressetLong, setPresetLong] = useState(0);

  useEffect(() => {
    handlePrefill();
  }, []);

  const handlePrefill = async () => {
    console.log("Prefilling form. Awaiting response...");
    console.log("User session:", userSession);
    const eventID = parseInt(localStorage.getItem("eventID"));

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/get_single_event",
        { event_id: eventID },
        { withCredentials: true }
      );
      console.log("Response:", response.data);

      const {
        name,
        category,
        time,
        description,
        location,
        phone,
        email,
        lat,
        long,
      } = response.data.event;

      document.getElementById("event_name").value = name;
      document.getElementById("category").value = category;
      // Original date string
      let dateString = time;

      // Convert to Date object
      let date = new Date(dateString);

      // Format to "YYYY-MM-DDThh:mm"
      let localDateTime = date.toISOString().slice(0, 16);
      document.getElementById("time").value = localDateTime;
      document.getElementById("description").value = description;
      document.getElementById("location").value = location;
      document.getElementById("phone").value = phone;
      document.getElementById("contact_email").value = email;
      localStorage.setItem("lat", response.data.event.lat);
      localStorage.setItem("long", response.data.event.long);
      setPresetLat(lat);
      setPresetLong(long);
    } catch (error) {
      // Log the error message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted. Awaiting response...");
    console.log("User session:", userSession);
    const rsoId = localStorage.getItem("rsoID");

    const user_id = userSession.id;
    const user_email = userSession.email;
    const lat = localStorage.getItem("lat");
    const long = localStorage.getItem("long");
    const rso = parseInt(rsoId); // This is a placeholder value
    const name = document.getElementById("event_name").value;
    const category = document.getElementById("category").value;
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const phone = document.getElementById("phone").value;
    const contact_email = document.getElementById("contact_email").value;

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/update_event",
        {
          event_id: parseInt(localStorage.getItem("eventID")),
          name,
          category,
          time,
          description,
          location,
          phone,
          contact_email,
          lat,
          long,
        },
        { withCredentials: true }
      );
      console.log("Response:", response.data);

      window.location.href = "/details";
    } catch (error) {
      // Log the error message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error message:", error.response.data);
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
    <>
      <Navbar />

      <div className="flex items-center h-screen pt-28">
        <div className="w-1/3 h-fit max-w-xl m-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black mb-3">
              Edit Event
            </h1>

            <form onSubmit={handleEventSubmit}>
              <h3 className="text-base font-bold pt-3 text-gray-600">Name</h3>
              <input
                type="text"
                id="event_name"
                placeholder="Event Name"
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Category
              </h3>
              <select
                id="category"
                className="w-full input input-bordered border-yellow-500"
              >
                <option value="private">Private</option>
                <option value="RSO">RSO</option>
              </select>

              <h3 className="text-base font-bold pt-3 text-gray-600">Time</h3>
              <input
                type="datetime-local"
                id="time"
                placeholder="Time of Event"
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Description
              </h3>
              <textarea
                type="text"
                id="description"
                placeholder="Description"
                className=" w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></textarea>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Location
              </h3>
              <input
                type="text"
                id="location"
                placeholder="123 example"
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <MyMap
                id="mymap"
                position={[pressetLat, pressetLong]}
                zoom={13}
              />

              <h3 className="text-base font-bold pt-3 text-gray-600">Phone</h3>
              <input
                type="text"
                id="phone"
                placeholder="1234567890"
                className="w-full input input-bordered border-yellow-500"
                onChange={handleChange}
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Contact Email
              </h3>
              <input
                type="text"
                id="contact_email"
                placeholder="example@domain.com"
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
                  Edit Event
                </button>
              </div>

              <div
                className="absolute flex items-center px-2 pt-5 pointer-events-none"
                style={{ right: "43rem", bottom: "36rem" }}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRsoEventForm;
