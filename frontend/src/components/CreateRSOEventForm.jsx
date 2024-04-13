import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useUserSession } from '../hooks/useUserSession';

const CreateRSOEventForm = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();

  useEffect(() => {
    handlePrefill();
  }, []);

  const handlePrefill = async () => {
    console.log('Prefilling form. Awaiting response...');
    console.log('User session:', userSession);
    const eventID = parseInt(localStorage.getItem('eventID'));

    try {
        const response = await axios.post(
            'https://somethingorother.xyz/get_single_event',
            { event_id: eventID },
            { withCredentials: true }
        );
        console.log('Response:', response.data);
    
        const { name, category, time, description, location, phone, email } = response.data.event;
    
        document.getElementById('event_name').value = name;
        document.getElementById('category').value = category;
        // Original date string
        let dateString = time;

        // Convert to Date object
        let date = new Date(dateString);

        // Format to "YYYY-MM-DDThh:mm"
        let localDateTime = date.toISOString().slice(0,16);
        document.getElementById('time').value = localDateTime;
        document.getElementById('description').value = description;
        document.getElementById('location').value = location;
        document.getElementById('phone').value = phone;
        document.getElementById('contact_email').value = email;
    }
    catch (error) {
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

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted. Awaiting response...');
    console.log('User session:', userSession);
    const rsoId = localStorage.getItem('rsoID');

    const user_id = userSession.id;
    const user_email = userSession.email;

    const rso = parseInt(rsoId); // This is a placeholder value
    const name = document.getElementById('event_name').value;
    const category = document.getElementById('category').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const phone = document.getElementById('phone').value;
    const contact_email = document.getElementById('contact_email').value;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/update_event',
        {
          event_id: parseInt(localStorage.getItem('eventID')),
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

    window.location.href = '/details';
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
            >
              Event Name
              <input type="text" id="event_name" placeholder="Knight World" />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Category
              <select type="input" id="category" placeholder="Category">
                {' '}
                <option value="private">Private</option>
                <option value="RSO">RSO</option>
              </select>
              {/* Changed type to email */}
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

export default CreateRSOEventForm;
