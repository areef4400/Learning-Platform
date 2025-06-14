import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import "./App.css";
import "./profile.css"
import { Search } from "./components/Search";
import { Navbar } from "./components/Navbar/Navbar";
import { Title } from "./components/Title/Title";
import { Signup } from "./components/SignUp/Signup";
import { Login } from "./components/Login/Login";
import { Results } from "./components/Results/Results";
import { SearchResults } from "./components/SearchResults/SearchResults";
import { Quiz } from "./components/Quiz/Quiz";

import dbmsImg from './images/dbms.png';
import os from './images/os.png';
import ai from './images/ai.png';
import algorithm from './images/algorithm.png';
import ann from './images/ann.png';
import c from './images/c.png';
import cpp from './images/cpp.png';
import cn from './images/cn.png';
import cc from './images/cc.png';
import cd from './images/cd.png';
import ml from './images/ml.png';
import java from './images/java.png';
import python from './images/python.png';
import coa from './images/coa.png';
import ds from './images/ds.png';
import wd from './images/wd.png';
import devops from './images/devops.png';
import se from './images/se.png';
import controlSystem from './images/controlSystem.png';
import ebs from './images/ebs.png';
import ss from './images/ss.png';
import vlsi from './images/vlsi.png';
import dip from './images/dip.png';
import mad from './images/mad.png';
import bd from './images/bd.png';
import bc from './images/bc.png';
import iot from './images/iot.png';
import wc from './images/wc.png';
import nlp from './images/nlp.png';
import robotic from './images/robotic.png';
import qc from './images/qc.png';
import cadcam from './images/cadcam.png';
import thermodinamics from './images/thermodinamics.png';
import em from './images/em.png';
import fm from './images/fm.png';
import res from './images/res.png';
import ee from './images/ee.png';
import dl from './images/dl.png';
import cs from './images/cs.png';
import { Roadmap } from "./components/Roadmap/Roadmap";

function App() {
  const [isLogin, setLogin] = useState(false);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleFavorite = (courseName) => {
    setFavoriteCourses((prev) =>
      prev.includes(courseName)
        ? prev.filter((name) => name !== courseName)
        : [...prev, courseName]
    );
  };

  const markAsCompleted = (courseName) => {
    setCompletedCourses((prev) =>
      prev.includes(courseName)
        ? prev.filter((name) => name !== courseName)
        : [...prev, courseName]
    );
  };

  const coursesData = [
    { name: 'C++', info: 'OOP, STL, inheritance, polymorphism' , image : cpp},
    { name: 'Computer Networks', info: 'OSI model, TCP/IP, protocols' , image :cn },
    { name: 'Compiler Design', info: 'Lexical analysis, parsing, code generation' , image :cd},
    { name: 'DBMS', info: 'Database management concepts and SQL',image:dbmsImg},
  { name: 'Algorithms', info: 'Greedy, divide & conquer, DP, graph' , image : algorithm},
  { name: 'C Programming', info: 'Pointers, arrays, memory management' , image : c},
  { name: 'Java', info: 'OOP, exception handling, collections' , image : java},
  { name: 'Python', info: 'Syntax, libraries, data analysis' , image : python},
  { name: 'Operating Systems', info: 'Processes, memory, CPU scheduling' , image :os },
  { name: 'Computer Oragnization and Architecture', info: 'Memory, cache, registers, instruction cycles' , image : coa},
  { name: 'Digital Logic', info: 'Boolean algebra, flip-flops, K-maps' , image : dl},
  { name: 'Data Structures', info: 'Stacks, queues, trees, graphs' , image : ds},
  { name: 'Machine Learning', info: 'Supervised, unsupervised, models' , image :ml },
  { name: 'Web Development', info: 'HTML, CSS, JS, React, Node.js' , image :wd},
  { name: 'Cybersecurity', info: 'Encryption, threats, firewalls' , image : cs},
  { name: 'Cloud Computing', info: 'AWS, Azure, scalability' , image : cc},
  { name: 'DevOps', info: 'CI/CD, Docker, Jenkins' , image : devops},
  { name: 'Software Engineering', info: 'SDLC, Agile, testing' , image : se},
  { name: 'Artificial Intelligence', info: 'Search, logic, learning' , image : ai},

  { name: 'Artificial Neural Networks', info: 'Deep learning and neural nets' , image : ann},
  { name: 'Control Systems', info: 'Feedback and system stability' , image :controlSystem },
  { name: 'Embedded Systems', info: 'Microcontrollers and sensors' , image : ebs},
  { name: 'Signal and Systems', info: 'Signals, Laplace, and Z-transforms' , image :ss },
  { name: 'VLSI Design', info: 'Digital IC and CMOS design' , image : vlsi},
  { name: 'Digital Image Processing', info: 'Filters and computer vision' , image : dip},
  { name: 'Mobile App Development', info: 'Android, iOS, and Flutter' , image : mad},
  { name: 'Big Data', info: 'Hadoop, Spark, MapReduce' , image : bd},
  { name: 'Blockchain Technology', info: 'Ledgers and smart contracts' , image : bc},
  { name: 'Internet of Things (IoT)', info: 'IoT architecture and cloud' , image : iot},
  { name: 'Wireless Communication', info: 'Modulation and 5G' , image :wc },
  { name: 'Natural Language Processing', info: 'Text, tokens, and transformers' , image :nlp },
  { name: 'Robotics', info: 'Kinematics and path planning' , image : robotic},
  { name: 'Quantum Computing', info: 'Qubits and quantum algorithms' , image : qc},
  { name: '3D Printing & CAD', info: 'Additive manufacturing design' , image : cadcam},
  { name: 'Thermodynamics', info: 'Energy, heat, and entropy' , image :thermodinamics },
  { name: 'Engineering Mechanics', info: 'Statics and dynamics of bodies' , image :em},
  { name: 'Fluid Mechanics', info: 'Flow, Bernoulli, and pressure' , image : fm},
  { name: 'Renewable Energy Systems', info: 'Solar, wind, and hydro' , image : res},
  { name: 'Environmental Engineering', info: 'Pollution control and sustainability' , image : ee},
  ];

  function Explore() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const [toastVisible, setToastVisible] = useState(false); 
    const [loading, setLoading] = useState(false);

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
    const handleClick = async (courseName, e) => {
      const userName = localStorage.getItem("userName");
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3000/aval/cc/user/getRoadmap?prompt=${encodeURIComponent(courseName)}`,{
          method : 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (!response.ok) {
          // If backend sends an error status
          console.error("Backend error:", data.error);
          return;
        }

        // Use the 'roadmap' key based on backend response structure
        const roadmap = data.roadmap;

        if (!roadmap || !Array.isArray(roadmap)) {
          console.error("Invalid roadmap data received", roadmap);
          return;
        }
        try {
          const res = await fetch('http://localhost:3000/aval/cc/user/addToOngoing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userName, course: courseName })
          });
          const data = await res.json();
          if (res.ok) {
            showToast("Added to OnGoing!")
          } else {
            <Toast message="Failed to add to ongoing!"onClose={() => setToastVisible(false)}/>
          }
        } catch (err) {
          alert('Network error while adding to ongoing.');
        }
        navigate('/roadmap', {
          state: {
            roadmap: roadmap,  // This should be your JSON array (tree-like)
            courseName: courseName
          }
        });
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }finally {
        setLoading(false);  // Stop loading
      }
    };

    const handleCompleteClick = async(courseName, e) => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/aval/cc/user/getQuiz`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: courseName })
        });

        if (!res.ok) {
          console.error("Server error:", res.status);
          return;
        }

        const data = await res.json();
        console.log("Received from backend:", data);

        if (!data.quiz || !Array.isArray(data.quiz)) {
          console.error("Error while fetching Quiz Questions");
          return;
        }

        navigate('/quiz', {
          state: {
            quiz: data.quiz,
            courseName
          }
        });

      } catch (error) {
        console.error("Error while Accessing Quiz", error);
      } finally {
        setLoading(false);
      }
    }

    if (loading) {
        return (
        <div className="loading-screen">
            <div className="spinner" />
            <p className="loading-text">Loading, please wait...</p>
        </div>
        );
    }
    const filteredCourses = coursesData.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="explore-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a Course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="courses-grid">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="course-card"
              onClick={(e) => handleClick(course.name, e)}
            >
              <img src={course.image} alt={course.name} className="course-image" />
              <div className="course-info">
                <h3>{course.name}</h3>
                <p>{course.info}</p>
              </div>
              <div className="course-actions">
                <button
                  className="action-btn favorite"
                  title="Favorite"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation()
                    if (favoriteCourses.includes(course.name)) {
                      alert(`"${course.name}" is already in your favorites.`);
                      return;
                    }
                    try {
                      const res = await fetch('http://localhost:3000/aval/cc/user/addToFav', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: userName, course: course.name })
                      });
                      const data = await res.json();
                      if (res.ok) {
                        showToast("Added to Favorites")
                        toggleFavorite(course.name); // Update state/UI
                      } else {
                        <Toast message="Failed to add to Favorites!"onClose={() => setToastVisible(false)}/>
                      }
                    } catch (err) {
                      alert('Network error while adding to favorites.');
                    }
                  }}
                    >
                  {favoriteCourses.includes(course.name) ? '⭐' : '☆'}
                </button>
                <button
                  className="action-btn complete"
                    title="Mark as Completed"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // ✅ This prevents the course card from opening
                      const confirmQuiz = window.confirm("Do you want to take the quiz to mark this as completed?");
                      if (confirmQuiz) {
                        handleCompleteClick(course.name, e); // ✅ PASS THE COURSE NAME
                      }
                    }}
                  // onClick={async (e) => {
                  //   e.stopPropagation();
                  //   e.preventDefault();

                  //   if (completedCourses.includes(course.name)) {
                  //     alert(`"${course.name}" is already marked as completed.`);
                  //     return;
                  //   }

                  //   try {
                  //     const res = await fetch('http://localhost:3000/aval/cc/user/addToCom', {
                  //       method: 'POST',
                  //       headers: { 'Content-Type': 'application/json' },
                  //       body: JSON.stringify({ email: userName, course: course.name })
                  //     });
                  //     const data = await res.json();

                  //     if (res.ok) {
                  //       showToast("Added to Completed")
                  //       markAsCompleted(course.name); // Update state/UI
                  //     } else {
                  //       <Toast message="Failed to add to Completed!"onClose={() => setToastVisible(false)}/>
                  //     }
                  //   } catch (err) {
                  //     alert('Network error while marking as completed.');
                  //   }
                  // }}
                >
                  {completedCourses.includes(course.name) ? '✅' : '☐'}
                </button>
              </div>
              <div className="overlay"></div>
            </div>
          ))}
        </div>

      </div>
    );
  }

  function MyCourses() {
    const userName = localStorage.getItem("userName");
    const [favoriteCourses, setFavoriteCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const [ongoingCourses, setOngoingCourses] = useState([]);
    const [reload, setReload] = useState(false);
    
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await fetch('http://localhost:3000/aval/cc/user/coursesData', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userName})
          });
          if (!res.ok) {
            throw new Error("Failed to fetch coursesData");
          }
          const data = await res.json();
          setFavoriteCourses(data.favoriteCourses);
          setCompletedCourses(data.completedCourses);
          setOngoingCourses(data.ongoingCourses);
        } catch (err) {
          console.error("Error fetching course data:", err);
        }
      };

      fetchCourses();
    }, [reload]);
    const coursesData = [
      { name: 'DBMS', info: 'Database management concepts and SQL',image:dbmsImg},
      { name: 'Operating Systems', info: 'Processes, memory, CPU scheduling' , image :os },
      { name: 'Computer Networks', info: 'OSI model, TCP/IP, protocols' , image :cn },
      { name: 'Compiler Design', info: 'Lexical analysis, parsing, code generation' , image :cd},
      { name: 'Algorithms', info: 'Greedy, divide & conquer, DP, graph' , image : algorithm},
      { name: 'C Programming', info: 'Pointers, arrays, memory management' , image : c},
      { name: 'C++', info: 'OOP, STL, inheritance, polymorphism' , image : cpp},
      { name: 'Java', info: 'OOP, exception handling, collections' , image : java},
      { name: 'Python', info: 'Syntax, libraries, data analysis' , image : python},
      { name: 'Computer Oragnization and Architecture', info: 'Memory, cache, registers, instruction cycles' , image : coa},
      { name: 'Digital Logic', info: 'Boolean algebra, flip-flops, K-maps' , image : dl},
      { name: 'Data Structures', info: 'Stacks, queues, trees, graphs' , image : ds},
      { name: 'Machine Learning', info: 'Supervised, unsupervised, models' , image :ml },
      { name: 'Web Development', info: 'HTML, CSS, JS, React, Node.js' , image :wd},
      { name: 'Cybersecurity', info: 'Encryption, threats, firewalls' , image : cs},
      { name: 'Cloud Computing', info: 'AWS, Azure, scalability' , image : cc},
      { name: 'DevOps', info: 'CI/CD, Docker, Jenkins' , image : devops},
      { name: 'Software Engineering', info: 'SDLC, Agile, testing' , image : se},
      { name: 'Artificial Intelligence', info: 'Search, logic, learning' , image : ai},

      { name: 'Artificial Neural Networks', info: 'Deep learning and neural nets' , image : ann},
      { name: 'Control Systems', info: 'Feedback and system stability' , image :controlSystem },
      { name: 'Embedded Systems', info: 'Microcontrollers and sensors' , image : ebs},
      { name: 'Signal and Systems', info: 'Signals, Laplace, and Z-transforms' , image :ss },
      { name: 'VLSI Design', info: 'Digital IC and CMOS design' , image : vlsi},
      { name: 'Digital Image Processing', info: 'Filters and computer vision' , image : dip},
      { name: 'Mobile App Development', info: 'Android, iOS, and Flutter' , image : mad},
      { name: 'Big Data', info: 'Hadoop, Spark, MapReduce' , image : bd},
      { name: 'Blockchain Technology', info: 'Ledgers and smart contracts' , image : bc},
      { name: 'Internet of Things (IoT)', info: 'IoT architecture and cloud' , image : iot},
      { name: 'Wireless Communication', info: 'Modulation and 5G' , image :wc },
      { name: 'Natural Language Processing', info: 'Text, tokens, and transformers' , image :nlp },
      { name: 'Robotics', info: 'Kinematics and path planning' , image : robotic},
      { name: 'Quantum Computing', info: 'Qubits and quantum algorithms' , image : qc},
      { name: '3D Printing & CAD', info: 'Additive manufacturing design' , image : cadcam},
      { name: 'Thermodynamics', info: 'Energy, heat, and entropy' , image :thermodinamics },
      { name: 'Engineering Mechanics', info: 'Statics and dynamics of bodies' , image :em},
      { name: 'Fluid Mechanics', info: 'Flow, Bernoulli, and pressure' , image : fm},
      { name: 'Renewable Energy Systems', info: 'Solar, wind, and hydro' , image : res},
      { name: 'Environmental Engineering', info: 'Pollution control and sustainability' , image : ee},
    ];
    const handleRemoveUnFavorite = async (courseName) => {
      try {
        const response = await fetch('http://localhost:3000/aval/cc/user/remove-favorite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email:userName, courseName })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch coursesData");
        }
        const data = await response.json();
        if (data.success) {
          setFavoriteCourses(prev => prev.filter(name => name !== courseName));
        } else {
          alert('Failed to remove from favorites');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleRemoveCompleted = async (courseName) => {
      try {
        const response = await fetch('http://localhost:3000/aval/cc/user/remove-completed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email:userName, courseName })
        });

       if (!response.ok) {
          throw new Error("Failed to fetch coursesData");
        }
        const data = await response.json();
        // const data = await response.json();
        if (data.success) {
          setCompletedCourses(prev => prev.filter(name => name !== courseName));
        } else {
          alert('Failed to remove from completed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleRemoveOngoing = async (courseName) => {
      try {
        const response = await fetch('http://localhost:3000/aval/cc/user/remove-ongoing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email:userName,courseName })
        });

        if (!response.ok) {
          throw new Error("Failed to fetch coursesData");
        }
        const data = await response.json();
        if (data.success) {
          setOngoingCourses(prev => prev.filter(name => name !== courseName));
        } else {
          alert('Failed to remove from completed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return (
      <div className="profile-container light">
        <h1>My Courses</h1>
        <div className="course-sections">
          <div className="course-category favorite">
            <h2>Favourite Courses</h2><br />
            <div className="courses-grid">
              {favoriteCourses.length === 0 ? (
                <p>No favourite courses.</p>
              ) : (
                favoriteCourses.map((course, i) => {
                  const matchedCourse = coursesData.find(data => data.name === course);
                  return (
                    <div key={i} className="course-card">
                      {matchedCourse ? (
                        <>
                          <img src={matchedCourse.image} alt={matchedCourse.name} className="course-image" />
                          <div className="course-info">
                            <h3>{matchedCourse.name}</h3>
                            <p>{matchedCourse.info}</p>
                            <button className="unfav-btn" onClick={() => handleRemoveUnFavorite(matchedCourse.name)}>Unfavourite</button>
                            </div>
                        </>
                      ) : (
                        <p style={{ color: 'red' }}>Course not found: {course}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="course-category completed">
            <h2>Completed Courses</h2><br />
            <div className="courses-grid">
              {completedCourses.length === 0 ? (
                <p>You haven't completed any courses yet.</p>
              ) : (
                completedCourses.map((course, i) => {
                  const matchedCourse = coursesData.find(data => data.name === course);
                  return (
                    <div key={i} className="course-card">
                      {matchedCourse ? (
                        <>
                          <img src={matchedCourse.image} alt={matchedCourse.name} className="course-image" />
                          <div className="course-info">
                            <h3>{matchedCourse.name}</h3>
                            <p>{matchedCourse.info}</p>
                            <button onClick={() => handleRemoveCompleted(matchedCourse.name)} className="remove-btn">Mark as Incomplete</button>
                            
                          </div>
                        </>
                      ) : (
                        <p style={{ color: 'red' }}>Course not found: {course}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="course-category ongoing">
            <h2>Ongoing Courses</h2><br />
            <div className="courses-grid">
              {ongoingCourses.length === 0 ? (
                <p>You haven't completed any courses yet.</p>
              ) : (
                ongoingCourses.map((course, i) => {
                  const matchedCourse = coursesData.find(data => data.name === course);
                  return (
                    <div key={i} className="course-card">
                      {matchedCourse ? (
                        <>
                          <img src={matchedCourse.image} alt={matchedCourse.name} className="course-image" />
                          <div className="course-info">
                            <h3>{matchedCourse.name}</h3>
                            <p>{matchedCourse.info}</p>
                            <button onClick={() => handleRemoveOngoing(matchedCourse.name)} className="remove-btn">Remove From OnGoing</button>
                          </div>
                        </>
                      ) : (
                        <p style={{ color: 'red' }}>Course not found: {course}</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }


function Profile() {
  const userName = localStorage.getItem("userName");
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [name,setName] = useState('');
  const [reload, setReload] = useState(false);
  const [bio, setBio] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  // const totalCourses = 40;
  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await fetch('http://localhost:3000/aval/cc/user/coursesData', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userName}),
          });
          const text = await res.text();
          const data = text ? JSON.parse(text) : {};
          // const data = await res.json();
          setFavoriteCourses(data.favoriteCourses);
          setCompletedCourses(data.completedCourses);
          setOngoingCourses(data.ongoingCourses);
          setName(data.name);
          console.log(name);
        } catch (err) {
          console.error("Error fetching course data:", err);
        }
      };

      fetchCourses();
    }, [reload]);
    const totalCourses = completedCourses.length + ongoingCourses.length; // fallback

  // Load saved data on component mount
  useEffect(() => {
    const savedBio = localStorage.getItem('userBio');
    const savedGithub = localStorage.getItem('userGithub');
    const savedLinkedin = localStorage.getItem('userLinkedin');

    if (savedBio) setBio(savedBio);
    if (savedGithub) setGithub(savedGithub);
    if (savedLinkedin) setLinkedin(savedLinkedin);
  }, []);

  // Save data to localStorage
  const handleSaveDetails = () => {
    localStorage.setItem('userBio', bio);
    localStorage.setItem('userGithub', github);
    localStorage.setItem('userLinkedin', linkedin);
    alert('Details saved!');
  };
      return (
        <div className="profile-wrapper">
      <div className="profile-card">
        <div className="avatar-section">
          <div className="avatar">{userName.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <h2>{name}</h2>
            <p>Courses Completed: {completedCourses.length}</p>
            <p>Ongoing Courses: {ongoingCourses.length}</p>
            <p>Favorites: {favoriteCourses.length}</p>
          </div>
        </div>

        <div className="section">
          <h3>👤 Bio</h3>
          <textarea
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="section">
          <h3>📊 Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(completedCourses.length / (totalCourses || 1)) * 100}%` }}
            ></div>
          </div>
          <p>{Math.round((completedCourses.length / (totalCourses || 1)) * 100)}% completed</p>
        </div>

        <div className="section">
          <h3>🔗 Social Links</h3>
          <input
            className="biolink"
            type="text"
            placeholder="GitHub URL"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <input
            className="biolink"
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <button className="save-btn" onClick={handleSaveDetails}>Save Details</button>
        </div>

        <div className="section">
          <h3>🧠 Skills Learned</h3>
          <div className="skills-list">
            {completedCourses.map((course, idx) => (
              <span className="skill-chip" key={idx}>{course}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTimeout(() => {
      setLogin(!!token);
      setLoading(false);
    }, 800); // 500ms ensures loading screen is visible
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p className="loading-text">Loading, please wait...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isLogin ? (
        <>
          <Title />
          <Navbar setLogin={setLogin} />
          <Routes>
            <Route path="/" element={
              <>
                <h1 className="welcome-message">Welcome!</h1>
                <Search placeholder="Search for a topic" />
              </>
            } />
            <Route path="/explore" element={
              <Explore
                favoriteCourses={favoriteCourses}
                completedCourses={completedCourses}
                toggleFavorite={toggleFavorite}
                markAsCompleted={markAsCompleted}
              />
            } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/results" element={<Results />} />
            <Route path="/searchResults" element={<SearchResults />} />
            <Route path="/mycourses" element={<MyCourses/>} />
            <Route path="/roadmap" element={<Roadmap/>}/>
            <Route path="/quiz" element = {<Quiz/>}/>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route path="/signup" element={<Signup setLogin={setLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;




   