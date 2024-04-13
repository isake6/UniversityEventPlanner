import React, { useState } from 'react';
import { useUserSession } from '../hooks/useUserSession';

const RSODetails = () => {
    const { getUserSessionData } = useUserSession();
    const userSession = getUserSessionData();
    const [activeRowIndex, setActiveRowIndex] = useState(null);

    const toggleRow = (index) => {
        setActiveRowIndex(activeRowIndex === index ? null : index);
    };

    const [activeRowIndex2, setActiveRowIndex2] = useState(null);

    const toggleRow2 = (index) => {
        setActiveRowIndex2(activeRowIndex2 === index ? null : index);
    };

    return (
        <>
            <div className='bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto'></div> {/* Spacing for Navbar */}
            <div className='flex justify-center mx-auto' style={{ maxWidth: "90%" }}>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ width: "90%" }}>
                    <h2 className="text-4xl text-black font-bold mb-1 text-center">Profile : Admin</h2>
                    <div className="mb-4">
                        <div className="flex justify-center text-lg text-black">
                            <span>{userSession.university_id}</span>
                        </div>
                        <div className="flex justify-center mb-5 text-lg text-black">
                            <span>{userSession.first_name}</span>
                        </div>

                        {/* Created RSOs */}
                        {/* Plan to Populate Dynamically */}

                        {/* Table */}
                        <div className="overflow-x-auto collapse">
                            <span className='flex justify-center text-2xl font-bold text-black'>Registered Student Organizations</span>
                            <table className="table mt-4 text-black">
                                {/* head */}
                                <thead className='text-black text-lg'>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Number of Events</th>
                                        <th></th>
                                        <th>Members</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* rows */}
                                    {[{ name: 'Cy Ganderton', category: 'Quality Control Specialist', description: 'Blue' },
                                    { name: 'Hart Hagerty', category: 'Desktop Support Technician', description: 'Purple' },
                                    { name: 'Brice Swyre', category: 'Tax Accountant', description: 'Red' }].map((row, index) => (
                                        <React.Fragment key={index}>
                                            {/* visible row */}
                                            <tr onClick={() => toggleRow(index)} className='clickable'>
                                                <th>{index + 1}</th>
                                                <td>{row.name}</td>
                                                <td>{row.category}</td>
                                                <td>{row.description}</td>
                                                <td>Members</td>
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
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <button className='btn btn-warning m-4'>Edit</button>
                                                            <button className='btn btn-warning m-4'>Delete</button>
                                                        </div>
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
                            <button className='border rounded-lg hover:bg-yellow-500 hover:text-white border-yellow-600 px-10 py-2'>Add New RSO</button>
                        </div>

                        <div className='overflow-x-auto collapse mt-24'>
                            <span className='flex justify-center text-2xl font-bold text-black'>Current Events</span>
                            <table className="table mt-4 text-black">
                                {/* head */}
                                <thead className='text-black text-lg'>
                                    <tr>
                                        <th></th>
                                        <th>Student Organization</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Location</th>
                                        <th>More</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* rows */}
                                    {[{ name: 'Tom', category: 'Quality Control Specialist', description: 'Blue' },
                                    { name: 'Tom', category: 'Desktop Support Technician', description: 'Purple' },
                                    { name: 'Tom', category: 'Tax Accountant', description: 'Red' }].map((row2, index) => (
                                        <React.Fragment key={index}>
                                            {/* visible row */}
                                            <tr onClick={() => toggleRow2(index)} className='clickable'>
                                                <th>{index + 1}</th>
                                                <td>{row2.name}</td>
                                                <td>{row2.category}</td>
                                                <td>{row2.description}</td>
                                                <td>Members</td>
                                                <td>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>

                                                </td>
                                            </tr>
                                            {/* collapsible row */}
                                            {activeRowIndex2 === index && (
                                                <tr>
                                                    <td>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    </td>
                                                    <td>
                                                        {/* Phone Number */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* Event Time */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* Email */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* additional content */}
                                                        <div>
                                                            {/* Add content you want to show when row is expanded */}
                                                            <button className='btn btn-warning m-4'>Edit</button>
                                                            <button className='btn btn-warning m-4'>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button className='border rounded-lg hover:bg-yellow-500 hover:text-white border-yellow-600 px-10 py-2'>Add New Student Organization</button>
                    </div>

                </div >
            </div>
        </>
    );
};

export default RSODetails;
