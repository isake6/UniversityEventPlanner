import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useUserSession } from '../hooks/useUserSession';
import { useNavigate } from 'react-router-dom';

const RSOSelection = () => {
  const navigate = useNavigate();
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [rsos, setRsos] = useState([]); // State to hold RSOs
  const [newRSOId, setNewRSOId] = useState(''); // State for new RSO ID to join

  useEffect(() => {
    fetchRSOs();
  }, []);

  const fetchRSOs = async () => {
    console.log('Fetching RSOs. Awaiting response...');
    const { id: user_id } = userSession;
    try {
      const response = await axios.post(
        'https://somethingorother.xyz/get_user_rso_list',
        { user_id },
        { withCredentials: true }
      );
      console.log('Response for RSO:', response.data);
      setRsos(response.data.rso_details);
    } catch (error) {
      console.error('Error fetching RSOs:', error);
    }
  };

  const handleSelectRSO = (rsoId) => {
    console.log('Selected RSO ID:', rsoId);
    // navigate(`/rso/${rsoId}`);
  };

  const handleDeleteRSO = async (rsoId) => {
    console.log('Attempting to leave/delete RSO ID:', rsoId);
    try {
      const response = await axios.post(
        'https://somethingorother.xyz/leave_rso',
        { user_id: userSession.id, rso_id: rsoId },
        { withCredentials: true }
      );
      console.log('Delete Response:', response.data);
      if (response.data.success) {
        setRsos(rsos.filter((rso) => rso.id !== rsoId));
      }
    } catch (error) {
      console.error('Error leaving RSO:', error);
    }
  };

  const handleJoinRSO = async (id) => {

    setNewRSOId(id);
    console.log('Attempting to join RSO ID:', id);
    try {
      const response = await axios.post(
        'https://somethingorother.xyz/join_rso',
        { user_id: userSession.id, rso_id: id },
        { withCredentials: true }
      );
      console.log('Join Response:', response.data);
      if (response.data.success) {
        setRsos([...rsos, { rso_id: id }]); // Optionally update the list
        setNewRSOId(''); // Clear the input after joining

        console.log(rsos);
      }
    } catch (error) {
      console.error('Error joining RSO:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center h-screen">
        <div className="w-1/3 h-fit max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black">
              Select or Join an RSO
            </h1>
            <ul className="mt-5">
              {rsos.map((rso) => (
                <lis
                  key={rso}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <button
                    onClick={() => handleSelectRSO(rso.id)}
                    className="text-lg text-left w-full font-semibold hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    {rso.name}
                  </button>
                  <button
                    onClick={() => handleJoinRSO(rso.id)}
                    className="ml-4 bg-green-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Join
                  </button>
                  <button
                    onClick={() => handleDeleteRSO(rso.id)}
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Leave
                  </button>
                </lis>
              ))}
            </ul>
            {/* <div className="mt-4">
              <input
                type="text"
                placeholder="Enter RSO ID to join"
                value={newRSOId}
                onChange={(e) => setNewRSOId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
              <button onClick={handleJoinRSO} className="btn btn-success ml-2">
                Join RSO
              </button>
            </div> */}
            <div className="w-full py-5 flex flex-col m-auto">
              <button
                onClick={() => navigate('/home')}
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

export default RSOSelection;
