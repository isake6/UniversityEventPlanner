import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useUserSession } from '../hooks/useUserSession';
import Navbar from './Navbar';
import { setAppElement } from 'react-modal';

setAppElement('#root');

const UniversityDetails = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [population, setPopulation] = useState('');

  useEffect(() => {
    const fetchUniversityDetails = async (event) => {
      console.log('Sending request to get university details');
      try {
        const response = await axios.post(
          'https://somethingorother.xyz/get_university_details',
          {
            university_id: userSession.university_id,
          }
        );
        console.log('Response:', response.data);
        const { name, location, description, student_population } =
          response.data;
        setName(name);
        setLocation(location);
        setDescription(description);
        setPopulation(student_population);
      } catch (error) {
        // Log the error message
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Error message:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      }
    };

    fetchUniversityDetails();
  }, [userSession.university_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('User session:', userSession);

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/update_university',
        {
          user_id: userSession.id,
          university_id: userSession.university_id,
          new_name: name,
          new_location: location,
          new_description: description,
          new_population: population,
        }
      );
      console.log('Update Response:', response.data);
      setIsModalOpen(false);
    } catch (error) {
      // Log the error message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error message:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto"></div>
      <div className="flex justify-center mx-auto" style={{ maxWidth: '90%' }}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
          <h2 className="text-4xl text-black font-bold mb-1 text-center">
            {name}
          </h2>
          <h1 className="text-2xl text-black font-bold mb-1 text-center">
            Location: {location}
          </h1>
          <p className="text-lg text-black mb-1 text-center">Description: {description}</p>
          <p className="text-lg text-black mb-1 text-center">
            Student Population: {population}
          </p>

          <div className="flex justify-center">
            <button
              onClick={toggleModal}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
            >
              Edit University Details
            </button>
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
            appElement={document.getElementById('root')}
          >
            <h2 className="text-lg text-black font-bold mb-1 text-center">
              Edit University Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="font-bold">
                  Name:{' '}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full text-gray-600"
                />
              </div>
              <div>
                <label htmlFor="location" className="font-bold">
                  Location:{' '}
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full text-gray-600"
                />
              </div>
              <div>
                <label htmlFor="description" className="font-bold">
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full h-24 text-gray-600"
                />
              </div>
              <div>
                <label htmlFor="population" className="font-bold">
                  Student Population:{' '}
                </label>
                <input
                  type="text"
                  id="population"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full text-gray-600"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={toggleModal}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default UniversityDetails;
