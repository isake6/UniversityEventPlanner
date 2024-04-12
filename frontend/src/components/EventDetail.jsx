import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';

const EventDetail = () => {
  const location = useLocation();
  const event = location.state;

  return (
    <div>
      <Navbar />
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center">{event.name}</h1>
          <p className="text-lg text-gray-600 text-center mt-2">
            {event.location} - {event.category}
          </p>
          <p className="mt-4 text-md text-gray-700 mx-auto text-center">
            {event.description}
          </p>
          {/* Comments and other sections */}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
