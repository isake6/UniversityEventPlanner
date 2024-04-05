import React from 'react';


const AdminAccount = () => {
    var name = "John Doe";

    return (
        <>
            <div className='h-screen bg-white'>
                <div className='flex justify-center align-middle pt-20 text-4xl text-black font-bold'>
                    {name}
                </div>
            </div>
        </>
    );
}

export default AdminAccount;