import React from 'react'
import { Link } from 'react-router-dom';



function Login() {

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-fit max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-5">
                    {/* Your card content here */}
                    <h1 className="text-3xl font-bold text-center">Event Login</h1>
                    <form>
                        <h3 className="text-base font-bold pt-4">Username</h3>
                        <input type="text" id="username" placeholder='Username/Email' className=" w-full input input-bordered input-primary"></input>

                        <h3 className="text-sm font-bold">Password</h3>
                        <input type="password" id="password" placeholder='Username/Email' className="w-full input input-bordered input-primary"></input>
                    </form>

                    <div className='flex flex-col p-4'>
                        <button className='btn btn-info'>Login</button>
                    </div>

                    <div className='flex flex-col'>
                        <a href='#' className='text-xs text-gray-600 hover:underline hover:text-blue-600 text-center'>Forgot Password?</a>
                        <a href='#' className='text-xs text-gray-600 hover:underline hover:text-blue-600 text-center'>Create Account</a>
                    </div>
                    
                </div>
            </div>
        </div>

        // <div style={{
        //     display: 'flex', flexDirection: 'column', alignItems: 'center',
        //     textAlign: 'center', margin: 'auto', backgroundColor: 'white',
        //     maxWidth: '500px', borderRadius: '30px', padding: '1rem'
        // }}>
        //     <form>
        //         <div>
        //             <label className="label">
        //                 <span className="text-base label-text">Username</span>
        //             </label>
        //             <input type="text" id="username" placeholder="Username/Email"
        //                 className="w-full input input-bordered input-primary" />
        //         </div>
        //         <div>
        //             <label className="label">
        //                 <span className="text-base label-text">Password</span>
        //             </label>
        //             <input type="password" id="password" placeholder="Enter Password"
        //                 className="w-full input input-bordered input-primary" />
        //         </div>
        //         <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
        //         <div>
        //             <button className="btn btn-primary">Login</button>
        //         </div>
        //         <div className="text-sm text-gray-600">Don't have an account?</div>
        //         <div>
        //             <Link to={'/create'} ><button className="btn btn-warning text">Create an account here!</button></Link>

        //         </div>

        //     </form>
        // </div>
    );
}

export default Login;