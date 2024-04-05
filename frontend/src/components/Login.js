import React from 'react';
import axios from 'axios';

const Login = () => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted. Awaiting response...');

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
        
            const response = await axios.post('https://somethingorother.xyz/login', { username, password }, { withCredentials: true });
            console.log('Response:', response.data);

        } catch (error) {
            // Log the error message
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error message:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', error.message);
            }
        }
    }

    return (
        <div className="flex items-center h-screen">
            <div className="w-1/3 h-fit max-w-xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
                <div className="p-5">
                    <h1 className="text-3xl font-bold text-center text-black">Event Login</h1>
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-base font-bold pt-10 text-gray-600">Username</h3>
                        <input type="text" id="username" placeholder='Username/Email' className=" w-full input input-bordered input-primary"></input>

                        <h3 className="text-sm font-bold text-gray-600 pt-5">Password</h3>
                        <input type="password" id="password" placeholder='Username/Email' className="w-full input input-bordered input-primary"></input>

                        <div className=' w-full py-5 flex flex-col m-auto'>
                        <button type="submit" className='btn btn-info font-bold text-xl bg-yellow-500'>Login</button>
                    </div>
                    </form>

                    <div className='pt-3 flex flex-col'>
                        <a href='#' className='text-base text-gray-600 hover:underline hover:text-blue-600 text-center'>Forgot Password?</a>
                        <div className='m-auto'>
                            <a className='text-base text-gray-600'>Don't have an account?</a>
                            <a href='/create' className='text-base text-gray-600 hover:underline hover:text-blue-600 text-center'> Create Account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;