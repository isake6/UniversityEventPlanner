import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useUserSession } from '../hooks/useUserSession';
import axios from 'axios';

const EventDetail = () => {
  const location = useLocation();
  const event = location.state;
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const [events, setEvents] = useState([]);
  const comment = 'This is a comment';
  const event_id = event.id;
  const [comments, setComments] = useState([
    { id: 1, text: 'Looking forward to this event!' },
    { id: 2, text: 'Can anyone tell me if there will be parking available?' },
  ]);

  const handleAddComment = async () => {
    console.log('Fetching events. Awaiting response...');
    console.log('User session:', userSession);
    console.log('Event ID:', event_id); // You can log it to verify it's correct

    const { id: user_id, university_id } = userSession;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/add_comment',
        { user_id, event_id, comment },
        { withCredentials: true }
      );
      console.log('Response:', response.data);
      setEvents(response.data.events);
    } catch (error) {
      if (error.response) {
        console.error('Error message:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }

    // Placeholder function for adding comments
    const newComment = prompt('Enter your comment:');
    if (newComment) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
    }
  };
  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleEditComment = (id) => {
    const newText = prompt('Edit your comment:');
    if (newText) {
      setComments(
        comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, text: newText };
          }
          return comment;
        })
      );
    }
  };

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
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Comments
            </h2>
            <div className="mt-2">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-100 rounded p-4 mb-2 relative"
                >
                  <p>{comment.text}</p>
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="absolute top-2 right-12 text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddComment}
                className="btn btn-primary mt-4"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
