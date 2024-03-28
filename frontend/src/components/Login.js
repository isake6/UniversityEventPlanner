import React from 'react'


const Login = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center', margin: 'auto', backgroundColor: 'white',
                    maxWidth: '500px', border: '1px solid red', borderRadius: '30px', padding: '1rem' }}>
            <form>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" id="username" placeholder="Username/Email"
                        className="w-full input input-bordered input-primary" />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input type="password" id="password" placeholder="Enter Password"
                        className="w-full input input-bordered input-primary" />
                </div>
                <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                <div>
                    <button className="btn btn-primary">Login</button>
                </div>
                <div className="text-sm text-gray-600">Don't have an account?</div>
                <div>
                    <button className="btn btn-warning text">Create account here!</button>
                </div>
            </form>
        </div>
    );
}

export default Login;