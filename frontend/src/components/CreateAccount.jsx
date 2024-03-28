import React from 'react';
import { Link } from 'react-router-dom';

function CreateAccount() {
  return (
    <>
      <form>
        <div>
          <label className="label">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username/Email"
            className="w-full input input-bordered input-primary"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            className="w-full input input-bordered input-primary"
          />
        </div>
        <div className="pt-5">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
}

export default CreateAccount;
