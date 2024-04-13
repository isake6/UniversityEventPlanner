import React, { useState, useEffect } from 'react';
import { useUserSession } from '../hooks/useUserSession';
import axios from 'axios';

const RSODetails = () => {
    const { getUserSessionData } = useUserSession();
    const userSession = getUserSessionData();
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const [events, setEvents] = useState([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        handleEventListing();
    }, []);

    const handleEventListing = async () => {
        console.log('Fetching events. Awaiting response...');
        console.log('User session:', userSession);
        const { id: user_id, university_id } = userSession;
        const adminID = localStorage.getItem("rsoAdminId");
        
        if (parseInt(adminID) === user_id) {
            setRole("admin");
            console.log("Set role to admin for adminID: ", adminID, " and user_id: ", user_id);
        }
        else
        {
            setRole("student");
            console.log("Set role to student for adminID: ", adminID, " and user_id: ", user_id);
        }

        try {
            const response = await axios.post(
                'https://somethingorother.xyz/get_events',
                { user_id, university_id },
                { withCredentials: true }
            );
            const rsoId = localStorage.getItem("rsoID");

            const difference = response.data.events.filter(events => events.rso === parseInt(rsoId));

            setEvents(difference);

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

    const toggleRow = (index) => {
        setActiveRowIndex(activeRowIndex === index ? null : index);
    };

    const [activeRowIndex2, setActiveRowIndex2] = useState(null);

    const toggleRow2 = (index) => {
        setActiveRowIndex2(activeRowIndex2 === index ? null : index);
    };

    const handleDelete = async (eventID) => {
        try {
            const response = await axios.post(
                'https://somethingorother.xyz/delete_event',
                { user_id : userSession.id, event_id : eventID },
                { withCredentials: true }
            );

        } catch (error) {
            if (error.response) {
                console.error('Error message:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
        console.log("Do Delete: ", eventID);
    }

    const handleEdit = async (eventID) => {
        console.log("Do Edit: ", eventID);
        localStorage.setItem("eventID", eventID);
        window.location.href = '/editRsoEvent';
    }

    const handleAddEvent = async () => {
        window.location.href = '/createRsoEvent';
    }

    return (
        <>
            <div className='bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto'></div> {/* Spacing for Navbar */}
            <div className='flex justify-center mx-auto' style={{ maxWidth: "90%" }}>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ width: "90%" }}>
                    <h2 className="text-4xl text-black font-bold mb-1 text-center">{localStorage.getItem("rsoName")}</h2>
                    <div className="mb-4">

                        {/* Created RSOs */}
                        {/* Plan to Populate Dynamically */}

                        {/* Table */}
                        <div className="overflow-x-auto collapse">
                            <span className='flex justify-center text-2xl font-bold text-black'>Events</span>
                            <table className="table mt-4 text-black">
                                {/* head */}
                                <thead className='text-black text-lg'>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Location</th>
                                        <th>Time</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* rows */}
                                    {events.map((row, index) => (
                                        <React.Fragment key={index}>
                                            {/* visible row */}
                                            <tr onClick={() => toggleRow(index)} className='clickable'>
                                                <th>{index + 1}</th>
                                                <td>{row.name}</td>
                                                <td>{row.category}</td>
                                                <td>{row.location}</td>
                                                <td>{row.time}</td>
                                                <td>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                </td>
                                            </tr>
                                            {/* collapsible row */}
                                            {activeRowIndex === index && (
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        {/* Description */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p style={{fontSize: "15px", fontWeight: "bold"}}>Description:</p>
                                                            <p>{row.description}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* Email */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p style={{fontSize: "15px", fontWeight: "bold"}}>Email:</p>
                                                            <p>{row.email}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* Phone */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p style={{fontSize: "15px", fontWeight: "bold"}}>Phone:</p>
                                                            <p>{row.phone}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        {role === "admin" && (
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <button onClick={() => handleEdit(row.id)} className='btn btn-warning m-4'>Edit</button>
                                                            <button onClick={() => handleDelete(row.id)} className='btn btn-warning m-4'>Delete</button>
                                                        </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Table End */}

                        <div className='flex justify-center'>
                            <button onClick={() => handleAddEvent()} className='border rounded-lg hover:bg-yellow-500 hover:text-white border-yellow-600 px-10 py-2'>Add Event</button>
                        </div>
                    </div>

                </div >
            </div>
        </>
    );
};

export default RSODetails;
