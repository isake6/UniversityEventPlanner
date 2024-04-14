import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useUserSession } from '../hooks/useUserSession';
import { Link } from 'react-router-dom';

const EventList = () => {
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    handleEventListing();
  }, []);

  const handleEventListing = async () => {
    console.log('Fetching events. Awaiting response...');
    console.log('User session:', userSession);
    const { id: user_id, university_id } = userSession;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/get_events',
        { user_id, university_id },
        { withCredentials: true }
      );
      console.log('Response:', response.data);
      setEvents(response.data.events);

      // Scroll the page down to the events list
      const element = document.getElementById('event_content');
      element.scrollIntoView({ behavior: 'smooth' });

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

  console.log('Events:', events);

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="hero min-h-screen">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Discover Amazing Events</h1>
            <p className="mb-5">Explore the best events around campus!</p>
            <button onClick={handleEventListing} className="btn btn-primary">
              Explore Now
            </button>
          </div>
        </div>
      </div>
      {/* Upcoming Events Section */}
      <div id="event_content"></div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Upcoming Events
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} state={event}>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{event.name}</div>
                    <p className="text-black text-base">
                      {event.description}
                    </p>
                    <p className="text-gray-700 text-base">
                      Location: {event.location}
                    </p>
                    <p className="text-gray-700 text-base">
                      Time: {event.time}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{event.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
