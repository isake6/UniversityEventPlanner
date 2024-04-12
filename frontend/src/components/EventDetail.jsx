import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://somethingorother.xyz/events/${eventId}`
        );
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const submitFeedback = async () => {
    const feedback = {
      comment,
      rating,
    };
    try {
      // Endpoint to submit feedback
      await axios.post(
        `https://somethingorother.xyz/events/${eventId}/feedback`,
        feedback
      );
      alert('Feedback submitted successfully!');
      setComment('');
      setRating(5);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-500 rounded-lg shadow-xl p-5">
          <h1 className="text-3xl font-bold text-white">{event.name}</h1>
          <p className="text-xl text-indigo-200">{event.description}</p>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{event.category}
            </span>
          </div>
          {/* Comment Form */}
          <div className="mt-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              className="textarea textarea-bordered w-full"
            />
            <div className="flex items-center justify-between mt-4">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="select select-bordered"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <button onClick={submitFeedback} className="btn btn-primary">
                Submit Feedback
              </button>
            </div>
          </div>
          {/* Return Link */}
          <Link to="/" className="btn btn-ghost mt-4">
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
