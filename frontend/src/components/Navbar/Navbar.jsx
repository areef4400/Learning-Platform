import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Navbar({ setLogin }) {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    function handleNav() {
        setIsOpen(!isOpen);
    }

    // Close navbar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button className="hamburger" onClick={handleNav}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div ref={navRef} className={`nav-div ${isOpen ? "open" : ""}`}>
                <ul className="nav-ul">
                    <li><button><Link to="/">Home</Link></button></li>
                    <li><button><Link to="/explore">Explore</Link></button></li>
                    <li><button><Link to="/mycourses">My Courses</Link></button></li>
                </ul>
                <div className="nav-gap"></div> {/* Adds spacing between top and bottom buttons */}
                <ul className="nav-right">
                    <li><button onClick={handleNav}><Link to="/profile">Profile</Link></button></li>
                    <li>
                        <button  onClick={() => { 
                            handleNav(); 
                            setLogin(false);
                            localStorage.removeItem("token")
                            localStorage.removeItem("userName")
                            localStorage.removeItem("userBio")
                            localStorage.removeItem("userGithub")
                            localStorage.removeItem("userLinkedin") 
                            }
                        }><Link>Logout</Link></button>
                    </li>
                </ul>
            </div>
        </>
    );
}
