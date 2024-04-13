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
      setRsos(response.data.rso_ids); // Update this line to match the structure of the response
    } catch (error) {
      if (error.response) {
        console.error('Error message:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }
  };

  const handleSelectRSO = (rsoId) => {
    console.log('Selected RSO ID:', rsoId);
    // navigate(`/rso/${rsoId}`); // Navigate to RSO detail page
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center h-screen">
        <div className="w-1/3 h-fit max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black">
              Select Your RSO
            </h1>
            <ul className="mt-5">
              {rsos.map((rso) => (
                <li key={rso.rso_id} className="border-b border-gray-200 py-2">
                  <button
                    onClick={() => handleSelectRSO(rso.rso_id)}
                    className="text-lg text-left w-full font-semibold hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    RSO #{rso.rso_id}{' '}
                    {/* Example placeholder if names aren't available */}
                  </button>
                </li>
              ))}
            </ul>
            <div className="w-full py-5 flex flex-col m-auto">
              <button
                onClick={() => navigate('/home')} // Assuming there's a dashboard to navigate to after selection
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
