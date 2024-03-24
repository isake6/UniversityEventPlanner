import React, { useState, useEffect } from "react"
import logo from '../assets/ucflogo.webp'

function Navbar() {
    
    return (
            <div className="navbar bg-yellow-400 " style={{height: window.innerHeight * .1}}>
                <div className="flex-1">
                    <img className="h-20 w-100" src={logo} alt="ucf-logo" style={{height: 75, width: 75, borderRadius: 100}}/>
                        <a className="btn btn-ghost text-xl bg-yellow-400">UCF Event Planner</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>
                                    Events
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    <li><a>Public</a></li>
                                    <li><a>Private</a></li>
                                    <li><a>RSO</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a href="login.html" className="text-black font-bold">Sign In</a></li>

                    </ul>
                </div>
            </div>
    );

};

export default Navbar