import React from 'react';
import Navbar from './Navbar';

const createEventForm = () => {
  return (
    <>
      <Navbar />

      <div className="text">
        <h2>Create your event here! </h2>
      </div>

      <div className="flex justify-center items-center min-h-screen ">
        {/* This line has been updated */}
        <div className="space-y-4 max-w-md w-full  shadow-xl ">
          {/* Added for form styling */}

          <label
            className="input input-bordered flex items-center gap-2"
            id="event_name"
          >
            Event Name
            <input type="text" placeholder="Knight World" />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Category
            <input type="input" id="category" placeholder="Tailgate" />{' '}
            {/* Changed type to email */}
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Event Time
            <input type="text" id="time" placeholder="2:00pm" />
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
            <input type="text" id="email" placeholder="ucfknights@ucf.edu" />
          </label>

          <button className="btn btn-info">Submit</button>
        </div>
      </div>
    </>
  );
};

export default createEventForm;
