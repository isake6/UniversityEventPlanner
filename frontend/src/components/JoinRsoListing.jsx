import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useUserSession } from "../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

const JoinRSOSelection = () => {
  const navigate = useNavigate();
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [rsos, setRsos] = useState([]); // State to hold RSOs
  const [newRSOId, setNewRSOId] = useState(""); // State for new RSO ID to join

  useEffect(() => {
    fetchRSOs();
  }, []);

  const fetchRSOs = async () => {
    console.log("Fetching RSOs. Awaiting response...");
    const { id: user_id } = userSession;
    try {
      const universityRsosResponse = await axios.post(
        "https://somethingorother.xyz/get_university_rsos",
        { university_id: userSession.university_id },
        { withCredentials: true }
      );

      // Fetch user RSOs
      const userRsosResponse = await axios.post(
        "https://somethingorother.xyz/get_user_rso_list",
        { user_id },
        { withCredentials: true }
      );

      console.log("University RSOs:", universityRsosResponse.data);
      console.log("User RSOs:", userRsosResponse.data);

      // Find the difference between the two data sets
      if (!universityRsosResponse.data.rso_details) return;
      if (!userRsosResponse.data.rso_details) return;
      const difference = universityRsosResponse.data.rso_details.filter(
        (universityRso) =>
          !userRsosResponse.data.rso_details.some(
            (userRso) => userRso.id === universityRso.id
          )
      );

      // Update the state with the difference
      setRsos(difference);
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

  const handleSelectRSO = (rsoId) => {
    console.log("Selected RSO ID:", rsoId);
    // navigate(`/rso/${rsoId}`);
  };

  const handleJoinRSO = async (id) => {
    setNewRSOId(id);
    console.log("Attempting to join RSO ID:", id);
    console.log("User ID:", userSession.id);

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/join_rso",
        { user_id: userSession.id, rso_id: id },
        { withCredentials: true }
      );
      console.log("Join Response:", response.data);
      if (response.data.success) {
        if (!rsos.some((rso) => rso.rso_id === id)) {
          setRsos([...rsos, { rso_id: id }]);
        }
        setNewRSOId(""); // Clear the input after joining
        console.log(rsos);
      }

      fetchRSOs();
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

  return (
    <div>
      <Navbar />
      <div className="flex items-center h-screen">
        <div className="w-1/3 h-fit max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black">
              Available RSOs to Join
            </h1>
            <ul className="mt-5">
              {rsos.map((rso) => (
                <lis
                  key={rso.rso_id}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <button
                    onClick={() => handleSelectRSO(rso.id)}
                    className="text-lg text-left w-full font-semibold hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    <h2 style={{ fontSize: "24px" }}>{rso.name}</h2>

                    <p style={{ fontSize: "16px" }}>{rso.description}</p>
                  </button>
                  <button
                    onClick={() => handleJoinRSO(rso.id)}
                    className="ml-4 bg-green-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Join
                  </button>
                </lis>
              ))}
            </ul>
            <div className="w-full py-5 flex flex-col m-auto">
              <button
                onClick={() => navigate("/home")}
                className="btn btn-info font-bold text-xl bg-yellow-500"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRSOSelection;
