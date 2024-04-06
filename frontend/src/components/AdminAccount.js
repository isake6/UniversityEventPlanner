import React from 'react';

const AdminProfile = ({ adminData }) => {
    return (
        <>
            <div className='bg-white shadow-md rounded px-8 pt-7 pb-8 mb-4 max-w-md mx-auto'></div> {/* Spacing for Navbar */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-5xl mx-auto" style={{height: "90vh"}}>
                <h2 className="text-4xl text-black font-bold mb-1 text-center">Profile : Admin</h2>
                <div className="mb-4">
                    <div className="flex justify-center text-lg text-black">
                        <span>{adminData.university}</span>
                    </div>
                    <div className="flex justify-center mb-5 text-lg text-black">
                        <span>{adminData.username}</span>
                    </div>

                    {/* Created RSOs */}
                    {/* Plan to Populate Dynamically */}
                    <div className='flex flex-col text-center my-5'>
                        <span className=' text-2xl font-bold text-black'>Registered Student Organizations</span>
                        <div class="card card-side bg-base-100 shadow-lg" style={{border: "2px solid rgb(234,179,8)"}}>
                            <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                            <div class="card-body">
                                <h2 class="card-title mx-auto">Movie Night!</h2>
                                <p>Click the button to watch on Jetflix app.</p>
                                <div class="card-actions justify-center">
                                    <button class="btn btn-wide hover:bg-yellow-500 text-black" style={{border: "2px solid rgb(234,179,8)"}}>Edit</button>
                                </div>

                                {/* Plan to turn into dropdown for each event under Admin RSO */}

                            </div>
                        </div>
                    </div>

                    <div>
                        Requests To Join RSOs
                        <div>
                            <h1>Requests as a Table</h1>
                            <div>
                                Each Request with associated information
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AdminProfile;
