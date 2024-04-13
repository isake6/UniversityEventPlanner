import React from 'react';
import SuperAdminProfile from '../components/SuperAdminAccount';
import Navbar from '../components/Navbar';

const SuperAdminAccountPage = () => {

    const superData = {
        username: 'superadmin123',
        university: 'University of Central Florida'
    };

    return (
        <>
            <Navbar />
            <SuperAdminProfile superData={superData} />
        </>
    );
};

export default SuperAdminAccountPage;