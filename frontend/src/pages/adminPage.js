import React from 'react';
import AdminProfile from '../components/AdminAccount';
import Navbar from '../components/Navbar';

const AdminAccountPage = () => {

    const adminData = {
        username: 'admin123',
        university: 'University of Central Florida'
    };

    return (
        <>
            <Navbar />
            <AdminProfile adminData={adminData} />
        </>
    );
};

export default AdminAccountPage;