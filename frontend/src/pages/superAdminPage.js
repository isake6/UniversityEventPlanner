import React from 'react';
import SuperAdminProfile from '../components/SuperAdminAccount';
import Navbar from '../components/Navbar';

const SuperAdminAccountPage = () => {

    const adminData = {
        username: 'superadmin123',
        university: 'University of Central Florida'
    };

    return (
        <>
            <Navbar />
            <SuperAdminProfile adminData={adminData} />
        </>
    );
};

export default SuperAdminAccountPage