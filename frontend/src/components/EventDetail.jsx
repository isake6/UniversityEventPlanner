import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useUserSession } from '../hooks/useUserSession';
import axios from 'axios';

const EventDetail = () => {
  const location = useLocation();
  const event = location.state;
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const event_id = event.id;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getEventComments();
  }, []);

  const getEventComments = async () => {
    // Get comments

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/get_comments',
        { event_id: event_id },
        { withCredentials: true }
      );
      console.log('Response:', response.data);
      setComments(response.data.comments);
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

  const handleAddComment = async () => {
    const comment = prompt('Enter your comment:');

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
    } catch (error) {
      if (error.response) {
        console.error('Error message:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }

    console.log('Comment:', comment);

    getEventComments();
    // Placeholder function for adding comments
  };
  const handleDeleteComment = async (id) => {
    const userId = userSession.id;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/delete_comment',
        { user_id : userId, comment_id : id },
        { withCredentials: true }
      );

      console.log('Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error message:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }

    getEventComments();
  };

  const handleEditComment = async (id, curComment) => {
    const userId = userSession.id;

    const newText = prompt("Comment");

    // try {
    //   const response = await axios.post(
    //     'https://somethingorother.xyz/update_comment',
    //     { user_id : userId, comment_id : id, new_comment: newText },
    //     { withCredentials: true }
    //   );

    //   console.log('Response:', response.data);
    // } catch (error) {
    //   if (error.response) {
    //     console.error('Error message:', error.response.data);
    //   } else if (error.request) {
    //     console.error('No response received:', error.request);
    //   } else {
    //     console.error('Error', error.message);
    //   }
    // }
  };

  return (
    <div>
      <Navbar />
      <div className='bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto'></div>
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
                  <p className='m-3'>{comment.author_email}</p>
                  <p className='m-3'>{comment.author_first_name} {comment.author_last_name}</p>
                  <p className='m-3' style={{ color: "black" }} >{comment.comment}</p>
                  <p className='m-3'>{comment.created_time}</p>
                  <p className='m-3'>{comment.edit_time}</p>
                  <div className='flex justify-between'>
                    <button onClick={() => handleEditComment(comment.id, comment.comment)} className="text-blue-500">
                      Edit
                    </button>

                    <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500">
                      Delete
                    </button>
                  </div>
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
