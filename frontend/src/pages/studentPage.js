import React from 'react';
import StudentProfile from '../components/StudentAccount';
import Navbar from '../components/Navbar';

const StudentAccountPage = () => {

    const studentData = {
        username: 'student123',
        university: 'University of Central Florida'
    };

    return (
        <>
            <Navbar />
            <StudentProfile studentData={studentData} />
        </>
    );
};

export default StudentAccountPage;