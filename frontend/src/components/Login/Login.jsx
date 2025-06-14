import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

export function Login({ setLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function showToast(message, duration = 3000) {
      const toast = document.createElement('div');
      toast.className = 'react-toast';
      toast.textContent = message;

      document.body.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      // Hide after duration
      setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
          toast.remove();
        });
      }, duration);
    }

    return (
        <>
            <div className='container'>
                <div className="centerColumn">
                    <div className='card'>
                        <h2>Welcome Back!</h2>
                        <div className="input-box-container">
                            <div className="input-label"></div>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                type="email" placeholder="Enter Email Address" className='input-field'/>
                        </div>
                        <div className='input-box-container'>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}
                                type="password" placeholder="Enter Password" className='input-field'/>
                        </div>
                        <button className='custom-button' onClick={async () => {
                            try {
                                const response = await fetch("http://localhost:3000/aval/cc/user/signin", {
                                    method: "POST",
                                    body: JSON.stringify({ email,password}),
                                    headers: { "Content-type": "application/json" }
                                });
                            if (response.ok) {
                                    setLogin(true);
                                    const data = await response.json();
                                    localStorage.setItem("token",data.token);
                                    localStorage.setItem("userName",email);
                                    showToast("Signed In");
                                    navigate("/");
                                } else {
                                    showToast("SignIn failed!");
                                }
                            } catch (error) {
                                console.error("Login failed:");
                            }
                        }}>Sign In</button>
                        <br /><br />
                        <p>New user? <Link className='entry-other'to="/signup">SignUp</Link></p>
                        <br />
                    </div>
                </div>
            </div>
        </>
    );
}
