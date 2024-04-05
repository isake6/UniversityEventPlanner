import React from 'react';

const CreateAccount = () => {
  return (
    <div>
      <div className="flex items-center h-screen pt-28">
        <div className="w-1/3 h-fit max-w-xl m-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col justify-center border border-yellow-500">
          <div className="p-5">
            <h1 className="text-3xl font-bold text-center text-black">Create Account</h1>
            <form>
              <h3 className="text-base font-bold pt-3 text-gray-600">First Name</h3>
              <input type="text" id="firstName" placeholder='First Name' className=" w-full input input-bordered input-primary"></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">Last Name</h3>
              <input type="text" id="lastName" placeholder='Last Name' className="w-full input input-bordered border-yellow-500"></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">Email</h3>
              <input type="text" id="email" placeholder='Email' className=" w-full input input-bordered border-yellow-500"></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">Password</h3>
              <input type="password" id="password" placeholder='Password' className=" w-full input input-bordered border-yellow-500"></input>

              <h3 className="text-base font-bold pt-3 text-gray-600">Password</h3>
              <input type="password" id="passwordConfirm" placeholder='Confirm Password' className="w-full input input-bordered border-yellow-500"></input>

              <div className="relative">
                <h3 className="text-base font-bold mt-2 text-gray-800">Role</h3>
                <select className="w-full input input-bordered input-primary border border-gray-300 appearance-none">
                  <option value="superAdmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option selected value="student">Student</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pt-5 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </form>

            <div className=' w-full py-6 flex flex-col m-auto'>
              <button className='btn btn-info font-bold text-xl bg-yellow-500'>Sign Up</button>
            </div>

            <div className='pt-3 flex flex-col'>
              <div className='m-auto'>
                <a className='text-base text-gray-600'>Already have an account? </a>
                <a href='/' className='text-base text-gray-600 hover:underline hover:text-blue-600 text-center'>Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
