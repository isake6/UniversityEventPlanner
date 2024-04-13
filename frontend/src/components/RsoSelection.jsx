import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const RSOSelection = () => {
  const navigate = useNavigate();

  // Dummy data for RSOs
  const rsoList = [
    { id: 1, name: 'Computer Science Club' },
    { id: 2, name: 'Art History Society' },
    { id: 3, name: 'Economics Forum' },
  ];

  // Handler for selecting an RSO (you might navigate to a detailed page or store the choice)
  const handleSelectRSO = (rsoId) => {
    console.log('Selected RSO ID:', rsoId);
    // navigate(`/rso/${rsoId}`); // Example of navigation, adjust as needed
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
              {rsoList.map((rso) => (
                <li key={rso.id} className="border-b border-gray-200 py-2">
                  <button
                    onClick={() => handleSelectRSO(rso.id)}
                    className="text-lg text-left w-full font-semibold hover:bg-yellow-100 px-2 py-1 rounded"
                  >
                    {rso.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className=" w-full py-5 flex flex-col m-auto">
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
