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

      <div className="text">
        <h2>Create your event here! </h2>
      </div>

      <form onSubmit={handleEventSubmit}>
        <div className="flex justify-center items-center min-h-screen ">
          {/* This line has been updated */}
          <div className="space-y-4 max-w-md w-full shadow-lg border-2 p-2 border-yellow-400 ">
            {/* Added for form styling */}

            <label
              className="input input-bordered flex items-center gap-2"
              id="event_name"
            >
              Event Name
              <input type="text" placeholder="Knight World" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Event Time
              <input type="datetime-local" id="time" placeholder="2:00pm" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Event Description
              <input
                type="text"
                id="description"
                placeholder="Football Fall Tailgate!"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Event Location
              <input
                type="text"
                id="location"
                placeholder="Football Fall Tailgate!"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Phone Number
              <input type="text" id="phone" placeholder="123-456-7890" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="text"
                id="contact_email"
                placeholder="ucfknights@ucf.edu"
              />
            </label>

            <button className="btn btn-info">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEventForm;
