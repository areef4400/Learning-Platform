import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
export function Signup({ setLogin }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const navigate = useNavigate()
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
        <div className='container'>
            <div className="centerColumn">
                <div className="card">
                    <h2>Create an Account</h2>
                    <div className="input-box-container">
                        <input value={username} onChange={(e) => { setUsername(e.target.value) }} 
                        className='input-field' type="text" placeholder="Enter Username"></input>
                    </div>
                    <div className="input-box-container">
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} 
                        className="input-field" type="mail" placeholder="Enter Email"></input>
                    </div>
                    <div className="input-box-container">
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} 
                        className="input-field" type="password" placeholder="Enter password"></input>
                    </div>
                    <div className="input-box-container">
                        <input value={password2} onChange={(e) => { setPassword2(e.target.value) }} 
                        className="input-field" type="password" placeholder="Confirm password"></input>
                    </div>
                    <button onClick={async () => {
                        try {
                            const response = await fetch("http://localhost:3000/aval/cc/user/signup", {
                                method: "POST",
                                body: JSON.stringify({ email, userName: username, password }),
                                headers: { "Content-type": "application/json" }
                            });

                            if (response.ok) {
                                setLogin(true);
                                const data = await response.json();
                                localStorage.setItem("token",data.token);
                                localStorage.setItem("userName",email);
                                showToast("Signed up");
                                navigate("/");
                            } else {
                                showToast("Signup failed!");
                            }
                        } catch (error) {
                            console.error("Error signing up:", error);
                            showToast("Something went wrong!");
                        }
                    }} className='custom-button'>Sign Up</button>
                    <br /><br />
                    <p >Already a User? <Link to="/login" className="entry-other">Login</Link></p>
                </div>
            </div>
        </div>
    )
}