import React from "react";
import Navbar from "../components/Navbar";
import List from "../components/EventListing";
const homePage = () => {
  const handleEventListing = async (event) => {
    event.preventDefault();
    console.log("Form submitted. Awaiting response...");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post(
        "https://somethingorother.xyz/getevent",
        { email, password },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
    } catch (error) {
      // Log the error message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error message:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <List />
    </>
  );
};

export default homePage;
