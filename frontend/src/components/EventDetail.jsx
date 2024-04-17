import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useUserSession } from "../hooks/useUserSession";
import axios from "axios";
import Modal from "react-modal";
import MyMap from "./Map";
import StarRatings from "react-star-ratings";

const EventDetail = () => {
  const location = useLocation();
  const event_cache = location.state;
  const { getUserSessionData } = useUserSession();
  const userSession = getUserSessionData();
  const event_id = event_cache.id;
  const [comments, setComments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addCommentModalIsOpen, setAddCommentModalIsOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingID, setRatingID] = useState(-1);
  const [originalRating, setOriginalRating] = useState(0);
  const [ratingExists, setRatingExists] = useState(false);
  const [ratingModalIsOpen, setRatingModalIsOpen] = useState(false);
  const [event, setEvent] = useState(event_cache);

  useEffect(() => {
    getEventComments();
    getUserRating();
    getEventDetails();
  }, []);

  const getEventDetails = async () => {
    try {
      const response = await axios.post(
        "https://somethingorother.xyz/get_single_event",
        { event_id: event_id },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      setEvent(response.data.event);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const getEventComments = async () => {
    // Get comments

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/get_comments",
        { event_id: event_id },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      setComments(response.data.comments);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const getUserRating = async () => {
    const userId = userSession.id;

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/get_user_rating",
        { user_id: userId, event_id: event_id },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
      if (response.data.message === "No rating exists") {
        setRating(0);
        setRatingExists(false);
      } else {
        setRatingID(response.data.rating.id);
        setOriginalRating(response.data.rating.rating);
        setRating(response.data.rating.rating);
        setRatingExists(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleAddComment = () => {
    setAddCommentModalIsOpen(true);
    console.log("Open the add comment modal");
  };

  const handleAddCommentCancel = () => {
    setAddCommentModalIsOpen(false);
    console.log("Closed on AddCommentCancel the add comment modal");
    setNewComment({ ...newComment, text: "" });
  };

  const handleAddCommentSubmit = async () => {
    setAddCommentModalIsOpen(false);
    console.log("Closed on submit the add comment modal");
    console.log("User session:", userSession);
    console.log("Event ID:", event_id); // You can log it to verify it's correct
    const { id: user_id, university_id } = userSession;
    const comment = newComment.text;
    setNewComment({ ...newComment, text: "" });
    try {
      const response = await axios.post(
        "https://somethingorother.xyz/add_comment",
        { user_id, event_id, comment },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }

    console.log("Comment:", comment);

    getEventComments();
    // Placeholder function for adding comments
  };
  const handleDeleteComment = async (id) => {
    const userId = userSession.id;

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/delete_comment",
        { user_id: userId, comment_id: id },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
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
        "https://somethingorother.xyz/update_comment",
        { user_id: userId, comment_id: commentId, new_comment: newComment },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
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

  const handleRating = async () => {
    setRatingModalIsOpen(true);
  };

  const handleAddRatingSubmit = async () => {
    const userId = userSession.id;

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/add_rating",
        { user_id: userId, event_id: event_id, rating },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
      setRatingModalIsOpen(false);
      setRatingExists(true);
      getEventDetails();
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleEditRatingSubmit = async () => {
    const userId = userSession.id;

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/update_rating",
        { rating_id: ratingID, new_rating: rating },
        { withCredentials: true }
      );

      console.log("Response:", response.data);
      setRatingModalIsOpen(false);
      setRatingExists(true);
      setOriginalRating(rating);
      setRating(rating);
      getEventDetails();
    } catch (error) {
      if (error.response) {
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error", error.message);
      }
    }
  };

  const handleAddRatingCancel = async () => {
    setRatingModalIsOpen(false);
    if (!ratingExists) {
      setRating(0);
    } else {
      setRating(originalRating);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto"></div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center">{event.name}</h1>
          {event.category !== "public" && (
            <p className="text-lg text-gray-600 text-center mt-2">
              Hosted by: {event.rso_name}
            </p>
          )}
          <p className="text-lg text-gray-600 text-center mt-2">
            {event.location} - {event.category}
          </p>
          <p className="text-lg text-gray-600 text-center mt-2">
            {event.lat}, {event.long}
          </p>
          {!addCommentModalIsOpen && !modalIsOpen && (
            <div
              className="flex justify-center items-center mb-4"
              style={{ height: "300px", width: "25%", margin: "0 auto" }}
            >
              <MyMap id="mymap" position={[event.lat, event.long]} zoom={13} />
            </div>
          )}
          <p className="mt-4 text-md text-gray-700 mx-auto text-center">
            <strong>Description</strong>
          </p>
          <p
            className="text-md text-gray-700 mx-auto text-center"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {event.description}
          </p>
          <p className="mt-4 text-md text-gray-700 mx-auto text-center">
            <strong>Time</strong>
          </p>
          <p className="text-md text-gray-700 mx-auto text-center">
            {event.time}
          </p>
          <p className="mt-4 text-md text-gray-700 mx-auto text-center">
            <strong>Contact Us</strong>
          </p>
          <p className="text-md text-gray-700 mx-auto text-center">
            Email: {event.email}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone:{" "}
            {event.phone}
          </p>
          <p className="mt-4 text-md text-gray-700 mx-auto text-center">
            <strong>Rating</strong>
          </p>
          <p className="text-md text-gray-700 mx-auto text-center">
            <p>
              <span style={{ fontWeight: 500 }}>Average Rating:</span>
              {event.average_rating
                ? " " + event.average_rating + "/ 5"
                : " No ratings yet"}
            </p>

            {userSession.id !== -1 && (
              <p className="text-md text-gray-700 mx-auto text-center">
                <span style={{ fontWeight: 500 }}>Your Rating:</span>
                <StarRatings
                  rating={rating}
                  starRatedColor="yellow"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="5px"
                />
              </p>
            )}
          </p>
          {userSession.id !== -1 && !ratingExists && (
            <p className="mt-2 mx-auto text-center">
              <button
                onClick={() => handleRating()}
                className="btn btn-success"
              >
                Rate This Event
              </button>
            </p>
          )}
          {rating !== 0 && (
            <p className="mt-2 mx-auto text-center">
              <button
                onClick={() => handleRating()}
                className="btn btn-success"
              >
                Edit Rating
              </button>
            </p>
          )}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Comments
            </h2>
            <div className="mt-2">
              {comments
                .sort((a, b) => {
                  const aTime = a.edit_time || a.created_time;
                  const bTime = b.edit_time || b.created_time;
                  return new Date(bTime) - new Date(aTime);
                })
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-100 rounded p-4 mb-2 relative"
                  >
                    <p className="m-3">{comment.author_email}</p>
                    <p className="m-3">
                      {comment.author_first_name} {comment.author_last_name}
                    </p>
                    <p
                      className="m-3"
                      style={{ color: "black", whiteSpace: "pre-wrap" }}
                    >
                      {comment.comment}
                    </p>
                    <p className="m-3">Created On: {comment.created_time}</p>
                    <p className="m-3">Edited On: {comment.edit_time}</p>
                    <div className="flex justify-between">
                      {userSession.id === comment.author_id && (
                        <button
                          onClick={() =>
                            toggleModal(comment.comment, comment.id)
                          }
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                      )}

                      {userSession.id === comment.author_id && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              {/* Edit Comment Modal */}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)", // This will give the overlay a black color with 75% opacity
                  },
                  content: {
                    color: "black", // This will give the text inside the modal a light steel blue color
                    width: "50%", // This will make the modal take up 50% of the width of the viewport
                    height: "25%", // This will make the modal take up 50% of the height of the viewport
                    margin: "auto", // This will center the modal in the middle of the viewport
                    padding: "20px", // This will add 20px of padding inside the modal
                  },
                }}
              >
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Edit Comment
                </h2>
                <textarea
                  value={currentComment?.text}
                  onChange={(e) =>
                    setCurrentComment({
                      ...currentComment,
                      text: e.target.value,
                    })
                  }
                  style={{ padding: "5px", width: "100%", height: "100px" }}
                />
                <div className="flex justify-between">
                  <button
                    className="btn btn-info"
                    onClick={handleEditCommentSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => setModalIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
              {/* Add Comment Modal */}
              <Modal
                isOpen={addCommentModalIsOpen}
                onRequestClose={() => setAddCommentModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)", // This will give the overlay a black color with 75% opacity
                  },
                  content: {
                    color: "black", // This will give the text inside the modal a light steel blue color
                    width: "50%", // This will make the modal take up 50% of the width of the viewport
                    height: "25%", // This will make the modal take up 50% of the height of the viewport
                    margin: "auto", // This will center the modal in the middle of the viewport
                    padding: "20px", // This will add 20px of padding inside the modal
                  },
                }}
              >
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Add Comment
                </h2>
                <textarea
                  placeholder="Enter your comment here"
                  value={newComment?.text}
                  onChange={(e) =>
                    setNewComment({ ...currentComment, text: e.target.value })
                  }
                  style={{ padding: "5px", width: "100%", height: "100px" }}
                />
                <div className="flex justify-between">
                  <button
                    className="btn btn-info"
                    onClick={handleAddCommentSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={handleAddCommentCancel}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
              {/* Rating Modal */}
              <Modal
                isOpen={ratingModalIsOpen}
                onRequestClose={() => setRatingModalIsOpen(false)}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.75)", // This will give the overlay a black color with 75% opacity
                  },
                  content: {
                    color: "black", // This will give the text inside the modal a light steel blue color
                    width: "50%", // This will make the modal take up 50% of the width of the viewport
                    height: "25%", // This will make the modal take up 50% of the height of the viewport
                    margin: "auto", // This will center the modal in the middle of the viewport
                    padding: "20px", // This will add 20px of padding inside the modal
                  },
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {ratingExists ? "Edit Rating" : "Add Rating"}
                </h2>
                <p className="mt-4 flex justify-center">
                  <StarRatings
                    rating={rating}
                    starRatedColor="yellow"
                    changeRating={(newRating) => setRating(newRating)}
                    numberOfStars={5}
                    name="rating"
                    starDimension="32px"
                    starSpacing="5px"
                  />
                </p>
                <div className="mt-14 flex justify-between">
                  {!ratingExists && (
                    <button
                      className="btn btn-info"
                      onClick={handleAddRatingSubmit}
                    >
                      Submit
                    </button>
                  )}
                  {ratingExists && (
                    <button
                      className="btn btn-info"
                      onClick={handleEditRatingSubmit}
                    >
                      Submit
                    </button>
                  )}
                  <button
                    className="btn btn-error"
                    onClick={handleAddRatingCancel}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
              {userSession.id !== -1 && (
                <button
                  onClick={handleAddComment}
                  className="flex m-auto btn btn-success mt-3"
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
