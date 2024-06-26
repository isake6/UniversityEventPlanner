import React, { useState, useEffect } from "react";
import { useUserSession } from "../hooks/useUserSession";
import axios from "axios";
import Modal from "react-modal";
import MyMap from "./Map";

const RSODetails = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [events, setEvents] = useState([]);
  const [role, setRole] = useState(null);
  const [rsoDetails, setRsoDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [activeState, setActiveState] = useState("false");

  useEffect(() => {
    handleEventListing();
  }, []);

  const handleEventListing = async () => {
    console.log("Fetching events. Awaiting response...");
    console.log("User session:", userSession);
    const { id: user_id, university_id } = userSession;

    // Get RSO details
    try {
      const response = await axios.post(
        "https://somethingorother.xyz/get_single_rso_details",
        { rso_id: localStorage.getItem("rsoID") },
        { withCredentials: true }
      );
      console.log("Response:", response.data);

      setRsoDetails(response.data.rso_details);
      setActiveState(response.data.rso_details.active);

      if (response.data.rso_details.admin === user_id) {
        setRole("admin");
        console.log(
          "Set role to admin for adminID: ",
          response.data.rso_details.admin,
          " and user_id: ",
          user_id
        );
      } else {
        setRole("student");
        console.log(
          "Set role to student for adminID: ",
          response.data.rso_details.admin,
          " and user_id: ",
          user_id
        );
      }
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/get_events",
        { user_id, university_id },
        { withCredentials: true }
      );
      const rsoId = localStorage.getItem("rsoID");

      const difference = response.data.events.filter(
        (events) => events.rso === parseInt(rsoId)
      );

      setEvents(difference);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const toggleRow = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
    setMessage("");
    setMessage2("");
  };

  const [activeRowIndex2, setActiveRowIndex2] = useState(null);

  const toggleRow2 = (index) => {
    setActiveRowIndex2(activeRowIndex2 === index ? null : index);
  };

  const handleDelete = async (eventID) => {
    try {
      const response = await axios.post(
        "https://somethingorother.xyz/delete_event",
        { user_id: userSession.id, event_id: eventID },
        { withCredentials: true }
      );
      handleEventListing();
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
    console.log("Do Delete: ", eventID);
  };

  const handleEdit = async (eventID) => {
    console.log("Do Edit: ", eventID);
    localStorage.setItem("eventID", eventID);
    window.location.href = "/editRsoEvent";
  };

  const handleAddEvent = async () => {
    if (activeState) {
      window.location.href = "/createRsoEvent";
    } else {
      setMessage2("RSO is inactive. Cannot add events.");
      setMessage("");
    }
  };

  const toggleModal = async () => {
    setIsModalOpen(!isModalOpen);
    setMessage("");
    setMessage2("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted. Awaiting response...");

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/update_rso",
        {
          user_id: userSession.id,
          rso_id: localStorage.getItem("rsoID"),
          name: name,
          description: description,
          admin_email: admin,
          university_id: userSession.university_id,
        },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      handleEventListing();
      setIsModalOpen(false);
      localStorage.setItem("rsoAdminId", response.data.admin_id);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
        setMessage(error.response.data.message);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setName(rsoDetails.name);
      setAdmin(rsoDetails.admin_email);
      setDescription(rsoDetails.description);
    }
  }, [isModalOpen, rsoDetails]);

  const handleLeave = async () => {
    const rsoId = localStorage.getItem("rsoID");

    console.log("Attempting to leave/delete RSO ID:", rsoId);
    try {
      const response = await axios.post(
        "https://somethingorother.xyz/leave_rso",
        { user_id: userSession.id, rso_id: rsoId },
        { withCredentials: true }
      );
      console.log("Delete Response:", response.data);
      window.location.href = "/myRSO";
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
        setMessage(error.response.data.message);
        setMessage2("");
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleChange = async () => {
    setMessage("");
    setMessage2("");

    const name = document.getElementById("name").value;
    const admin = document.getElementById("admin").value;
    const description = document.getElementById("description").value;

    setName(name);
    setAdmin(admin);
    setDescription(description);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto"></div>{" "}
      {/* Spacing for Navbar */}
      <div className="flex justify-center mx-auto" style={{ maxWidth: "90%" }}>
        <div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          style={{ width: "90%" }}
        >
          <h2 className="text-4xl text-black font-bold mb-1 text-center">
            {rsoDetails.name}
          </h2>
          <h1
            className="text-2xl text-black font-bold mb-1 text-center"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {rsoDetails.description}
          </h1>
          <p className="text-lg text-black font-bold mb-1 text-center">
            Admin: {rsoDetails.admin_email}
          </p>
          <p className="text-lg text-black mb-1 text-center">
            Member Count: {rsoDetails.member_count}
          </p>
          <div className="flex justify-center">
            {activeState && <p className="text-green-600 font-bold">Active</p>}
            {!activeState && <p className="text-red-600 font-bold">Inactive</p>}
          </div>
          {/* Edit RSO details button */}
          {role === "admin" && (
            <div className="flex justify-center">
              <button
                onClick={() => toggleModal()}
                className="border rounded-lg hover:bg-yellow-500 hover:text-white border-yellow-600 px-10 py-2"
              >
                Edit RSO
              </button>
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
              },
              content: {
                color: "black",
                width: "50%",
                height: "35%",
                margin: "auto",
                padding: "20px",
              },
            }}
          >
            {/* Modal content */}
            <h2 className="text-lg text-black font-bold mb-1 text-center">
              Edit RSO Details
            </h2>
            {/* Add form fields for editing RSO details here */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" style={{ fontWeight: "bold" }}>
                  Name:{" "}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleChange}
                  style={{ color: "grey" }}
                />
              </div>
              <div>
                <label htmlFor="admin" style={{ fontWeight: "bold" }}>
                  Admin:{" "}
                </label>
                <input
                  type="text"
                  id="admin"
                  value={admin}
                  onChange={handleChange}
                  style={{ color: "grey" }}
                />
              </div>
              <div>
                <label htmlFor="description" style={{ fontWeight: "bold" }}>
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleChange}
                  style={{
                    padding: "5px",
                    color: "grey",
                    width: "100%",
                    height: "100px",
                  }}
                />
              </div>

              {message && (
                <div
                  className="pt-4 text-center font-bold"
                  style={{ color: "red" }}
                >
                  {message}
                </div>
              )}

              <div className="flex justify-between">
                <button className="btn btn-info" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </Modal>
          <div className="mb-4">
            {/* Created RSOs */}
            {/* Plan to Populate Dynamically */}

            {/* Table */}
            <div className="overflow-x-auto collapse">
              <span className="flex justify-center text-2xl font-bold text-black">
                Events
              </span>
              <table className="table mt-4 text-black">
                {/* head */}
                <thead className="text-black text-lg">
                  <tr>
                    <th style={{ width: "10%" }}></th>
                    <th style={{ width: "15%" }}>Name</th>
                    <th style={{ width: "15%" }}>Category</th>
                    <th style={{ width: "20%" }}>Location</th>
                    <th style={{ width: "20%" }}>Time</th>
                    <th style={{ width: "20%" }}>More</th>
                  </tr>
                </thead>
                <tbody>
                  {/* rows */}
                  {events.map((row, index) => (
                    <React.Fragment key={index}>
                      {/* visible row */}
                      <tr
                        onClick={() => toggleRow(index)}
                        className="clickable"
                      >
                        <th>{index + 1}</th>
                        <td>{row.name}</td>
                        <td>{row.category}</td>
                        <td>
                          <p>{row.location}</p>
                          <p>
                            {row.lat}, {row.long}
                          </p>
                        </td>
                        <td>{row.time}</td>
                        <td>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </td>
                      </tr>
                      {/* collapsible row */}
                      {activeRowIndex === index && (
                        <tr>
                          <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </td>
                          <td>
                            {/* Description */}
                            <div>
                              {/* Add content you want to show when row is expanded */}
                              <p
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                Description:
                              </p>
                              <p style={{ whiteSpace: "pre-wrap" }}>
                                {row.description}
                              </p>
                            </div>
                          </td>
                          <td>
                            {/* Email */}
                            <div>
                              {/* Add content you want to show when row is expanded */}
                              <p
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                Email:
                              </p>
                              <p>{row.email}</p>
                            </div>
                          </td>
                          <td>
                            {/* Phone */}
                            <div>
                              {/* Add content you want to show when row is expanded */}
                              <p
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                Phone:
                              </p>
                              <p>{row.phone}</p>
                            </div>
                          </td>
                          <td>
                            {/* Map Location */}
                            <div>
                              {/* Add content you want to show when row is expanded */}
                              <p
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                Location:
                              </p>
                              <MyMap position={[row.lat, row.long]} zoom={13} />
                            </div>
                          </td>
                          <td>
                            {/* additional content */}
                            {role === "admin" && (
                              <div>
                                {/* Add content you want to show when row is expanded */}
                                <button
                                  onClick={() => handleEdit(row.id)}
                                  className="btn btn-info"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(row.id)}
                                  className="btn btn-error m-4"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table End */}

            {role === "admin" && (
              <div className="flex flex-col items-center justiify-center">
                {message2 && (
                  <div className="font-bold" style={{ color: "red" }}>
                    {message2}
                  </div>
                )}
                <button
                  onClick={() => handleAddEvent()}
                  className="border rounded-lg hover:bg-yellow-500 hover:text-white border-yellow-600 px-10 py-2"
                >
                  Add Event
                </button>
              </div>
            )}

            <div className="flex justify-center">
              {message && (
                <div
                  className="absolute bottom-24 right-10 font-bold"
                  style={{ color: "red" }}
                >
                  {message}
                </div>
              )}
              <button
                onClick={() => handleLeave()}
                className="absolute bottom-10 right-10 btn btn-error"
              >
                Leave RSO
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RSODetails;
