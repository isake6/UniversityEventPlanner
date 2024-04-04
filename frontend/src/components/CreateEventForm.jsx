import React from 'react';
import Navbar from './Navbar';

const createEventForm = () => {
  return (
    <>
      <Navbar />

      <div className="text">
        <h2>Create your event here! </h2>
      </div>

      <div className="flex justify-center items-center min-h-screen">
        {/* This line has been updated */}
        <div className="space-y-4 max-w-md w-full">
          {/* Added for form styling */}
          <label className="input input-bordered flex items-center gap-2">
            Event Name
            <input type="text" placeholder="Knight World" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Description
            <input
              type="text-area"
              placeholder="It's a world of knights!"
            />{' '}
            {/* Changed type to email */}
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Event Type
            <input type="dropdown" id="eventType" placeholder="Private" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <span className="badge badge-info">Optional</span>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <span className="badge badge-info">Optional</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default createEventForm;
