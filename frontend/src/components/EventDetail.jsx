import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useUserSession } from '../hooks/useUserSession';
import axios from 'axios';
import Modal from 'react-modal';

const EventDetail = () => {
  const location = useLocation();
  const event = location.state;
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const event_id = event.id;
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addCommentModalIsOpen, setAddCommentModalIsOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [currentCommentId, setCurrentCommentId] = useState(null);

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
  
  const handleAddComment = () => {
    setAddCommentModalIsOpen(true);
  };

  const handleAddCommentCancel = () => {
    setAddCommentModalIsOpen(false);
    setNewComment({ ...newComment, text: '' });
  };

  const handleAddCommentSubmit = async () => {
    setAddCommentModalIsOpen(false);
    console.log('User session:', userSession);
    console.log('Event ID:', event_id); // You can log it to verify it's correct
    const { id: user_id, university_id } = userSession;
    const comment = newComment.text;
    setNewComment({ ...newComment, text: '' });
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
        { user_id: userId, comment_id: id },
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

  const handleEditCommentSubmit = async () => {
    // call the edit comment endpoint /update_comment
    const userId = userSession.id;
    const commentId = currentCommentId;
    const newComment = currentComment.text;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/update_comment',
        { user_id: userId, comment_id: commentId, new_comment: newComment },
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

    // Close the modal
    setModalIsOpen(false);
    getEventComments();
  };

  const toggleModal = async (comment, id) => {
    setModalIsOpen(!modalIsOpen);
    setCurrentCommentId(id);
    setCurrentComment({ ...currentComment, text: comment });
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
                  <p className='m-3' style={{ color: "black", whiteSpace: "pre-wrap" }} >{comment.comment}</p>
                  <p className='m-3'>Created On: {comment.created_time}</p>
                  <p className='m-3'>Edited On: {comment.edit_time}</p>
                  <div className='flex justify-between'>
                    {userSession.id === comment.author_id && (
                      <button onClick={() => toggleModal(comment.comment, comment.id)} className = 'btn btn-info'>
                        Edit
                      </button>
                    )}
                    {/* Edit Comment Modal */}
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                      style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.75)' // This will give the overlay a black color with 75% opacity
                        },
                        content: {
                          color: 'black', // This will give the text inside the modal a light steel blue color
                          width: '50%', // This will make the modal take up 50% of the width of the viewport
                          height: '25%', // This will make the modal take up 50% of the height of the viewport
                          margin: 'auto', // This will center the modal in the middle of the viewport
                          padding: '20px' // This will add 20px of padding inside the modal
                        }
                      }}
                    >
                      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Edit Comment</h2>
                      <textarea
                        value={currentComment?.text}
                        onChange={e => setCurrentComment({ ...currentComment, text: e.target.value })}
                        style={{ width: '100%', height: '100px' }}
                      />
                      <div className="flex justify-between">
                        <button className='btn btn-info' onClick={handleEditCommentSubmit}>Submit</button>
                        <button className='btn btn-error' onClick={() => setModalIsOpen(false)}>Cancel</button>
                      </div>
                    </Modal>
                    {/* Add Comment Modal */}
                    <Modal
                      isOpen={addCommentModalIsOpen}
                      onRequestClose={() => setAddCommentModalIsOpen(false)}
                      style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.75)' // This will give the overlay a black color with 75% opacity
                        },
                        content: {
                          color: 'black', // This will give the text inside the modal a light steel blue color
                          width: '50%', // This will make the modal take up 50% of the width of the viewport
                          height: '25%', // This will make the modal take up 50% of the height of the viewport
                          margin: 'auto', // This will center the modal in the middle of the viewport
                          padding: '20px' // This will add 20px of padding inside the modal
                        }
                      }}
                    >
                      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Add Comment</h2>
                      <textarea
                        value={newComment?.text}
                        onChange={e => setNewComment({ ...currentComment, text: e.target.value })}
                        style={{ width: '100%', height: '100px' }}
                      />
                      <div className="flex justify-between">
                        <button className='btn btn-info' onClick={handleAddCommentSubmit}>Submit</button>
                        <button className='btn btn-error' onClick={handleAddCommentCancel}>Cancel</button>
                      </div>
                    </Modal>

                    {userSession.id === comment.author_id && (
                      <button onClick={() => handleDeleteComment(comment.id)} className="btn btn-error"> 
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {userSession.id !== -1 && (
                <button
                  onClick={handleAddComment}
                  className="btn btn-success"
                >
                  Add Comment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
