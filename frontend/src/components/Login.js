import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const userSessionData = JSON.stringify({
    id : -1,
    first_name : null,
    last_name : null,
    role : null,
    email: null,
    university_id : null,
  });

  localStorage.setItem('userSession', userSessionData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted. Awaiting response...');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post(
        'https://somethingorother.xyz/login',
        { email, password },
        { withCredentials: true }
      );
      console.log('Response:', response.data);

      // Renamed "email" from the response to "emailResponse" to avoid shadowing
      const {
        id,
        first_name,
        last_name,
        role,
        email: emailResponse,
        university_id,
      } = response.data;

      console.log('User ID:', id);

      // Use the renamed variable "emailResponse" here
      const userSessionData = JSON.stringify({
        id,
        first_name,
        last_name,
        role,
        email: emailResponse,
        university_id,
      });

      localStorage.setItem('userSession', userSessionData);

      navigate('/home');
    } catch (error) {
      // Log the error message
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error message:', error.response.data);
        setMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
  };

  const handleChange = async () => {
    setMessage('');
  }

  return (

    <div className="flex items-center h-screen">
      <div className="w-1/3 h-fit max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
        <div className="p-5">
          <h1 className="text-3xl font-bold text-center text-black">
            Event Login
          </h1>
          <form onSubmit={handleSubmit}>
            <h3 className="text-base font-bold pt-10 text-gray-600">Email</h3>
            <input
              type="text"
              id="email"
              placeholder="Email"
              className=" w-full input input-bordered input-primary"
              onChange={handleChange}
            ></input>

            <h3 className="text-sm font-bold text-gray-600 pt-5">Password</h3>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full input input-bordered input-primary"
              onChange={handleChange}
            ></input>

            {message && (
              <div className='pt-4 text-center font-bold' style={{color: "red"}}>
                {message}
              </div>
            )}

            <div className=" w-full py-5 flex flex-col m-auto">
              <button
                type="submit"
                className="btn btn-info font-bold text-xl bg-yellow-500"
              >
                Login
              </button>
            </div>
          </form>

          <div className="pt-3 flex flex-col">
            <div className="m-auto">
              <a className="text-base text-gray-600">Don't have an account? </a>
              <a
                href="/create"
                className="text-base text-gray-600 hover:underline hover:text-blue-600 text-center"
              >
                Create Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
