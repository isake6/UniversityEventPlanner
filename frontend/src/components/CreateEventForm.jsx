import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useUserSession } from '../hooks/useUserSession';

const CreateEventForm = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted. Awaiting response...');
    console.log('User session:', userSession);

    const user_id = userSession.id;
    const user_email = userSession.email;

    const rso = ""; // This is a placeholder value
    const name = document.getElementById('event_name').value;
    const category = "public";
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;
    const contact_email = document.getElementById('contact_email').value;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/add_event',
        {
          user_id,
          user_email,
          rso,
          name,
          category,
          time,
          description,
          location,
          phone,
          contact_email,
        },
        { withCredentials: true }
      );
      console.log('Response:', response.data);
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
  return (
    <>
      <Navbar />

      <div className="flex items-center h-screen pt-28">
        <div className="w-1/3 h-fit max-w-xl m-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black mb-3">
              Register Event
            </h1>
            <p className='text-center font-bold'>Fill out this form to register a Public Event</p>
            <p className='text-center font-bold'>Must be approved by Super Admin</p>
            <form onSubmit={handleEventSubmit}>
              <h3 className="text-base font-bold pt-3 text-gray-600">
                Name
              </h3>
              <input
                type="text"
                id="event_name"
                placeholder="Event Name"
                className=" w-full input input-bordered input-primary"
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Time
              </h3>
              <input
                type="datetime-local"
                id="time"
                placeholder="Time of Event"
                className="w-full input input-bordered border-yellow-500"
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Description
              </h3>
              <textarea
                type="text"
                id="description"
                placeholder="Description"
                className=" w-full input input-bordered border-yellow-500"
              ></textarea>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Location
              </h3>
              <input
                type="text"
                id="location"
                placeholder="123 example"
                className="w-full input input-bordered border-yellow-500"
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Phone
              </h3>
              <input
                type="text"
                id="phone"
                placeholder="1234567890"
                className="w-full input input-bordered border-yellow-500"
              ></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">
                Contact Email
              </h3>
              <input
                type="text"
                id="contact_email"
                placeholder="example@domain.com"
                className="w-full input input-bordered border-yellow-500"
              ></input>

              <div className="relative"></div>

              <div className=" w-full py-6 flex flex-col m-auto">
                <button
                  type="submit"
                  className="btn btn-info font-bold text-lg bg-yellow-500"
                >
                  Register Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEventForm;
