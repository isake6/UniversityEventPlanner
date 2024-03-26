import React from "react"

function Login() {

    return (
            <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-white" style={{flex: 1}}>
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg" style={{ maxWidth: "500px"}}>
                    <h1 className="text-3xl font-semibold text-center text-yellow-400">Event Account</h1>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input type="text" placeholder="Email Address/User"
                                className="w-full input input-bordered input-primary" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter Password"
                                className="w-full input input-bordered input-primary" />
                        </div>
                        <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                        <div>
                            <button className="btn btn-warning">Login</button>
                        </div>

                        <div className="text-sm">Don't have an account?</div>
                        <button className="btn btn-primary">Create Account</button>
                    </form>
                </div>
            </div>

    );

};

export default Login;