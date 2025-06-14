import './Roadmap.css';
import { useNavigate, useLocation} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';

export function Roadmap() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roadmap, courseName } = location.state || {};
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem("userName");

  const fetchTopicDetails = async (topicName, e) => {
    e.stopPropagation(); // prevent bubbling
    setLoading(true);  // Start loading
    try {
      // Fetch content
      const contentRes = await fetch(`http://localhost:3000/aval/cc/user/getContent?prompt=${encodeURIComponent(topicName+" in/of "+courseName)}`);
      const contentData = await contentRes.json();

      // Parse content result safely
      let parsedResult = {};
      try {
        parsedResult = JSON.parse(contentData.result);
      } catch {
        parsedResult = { response: "No content available." };
      }

      // Fetch YouTube videos
      const ytRes = await fetch(`http://localhost:3000/aval/cc/user/getYoutubeVid?prompt=${encodeURIComponent(topicName+" in/of "+courseName)}`);
      const ytData = await ytRes.json();

      // Fetch websites
      const webRes = await fetch(`http://localhost:3000/aval/cc/user/getWebsites?prompt=${encodeURIComponent(courseName+" OR "+topicName+" in/of "+courseName)}`);
      const webData = await webRes.json();

      // Navigate to search results page
      navigate('/searchResults', {
        state: {
          content: parsedResult.response,
          websites: webData.result,
          youtubeLinks: ytData.result,
          title: topicName,
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally {
      setLoading(false);  // Stop loading
    }
  };

  // Recursive component to render roadmap tree
  const RoadmapNode = ({ topic, onClick }) => (
    <div className="roadmap-node">
      <div
        className="topic-text"
        onClick={(e) => onClick(topic.name, e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(topic.name, e);
          }
        }}
      >
        {topic.name}
      </div>
      {topic.children && topic.children.length > 0 && (
        <div className="roadmap-children">
          {topic.children.map((child, idx) => (
            <RoadmapNode key={idx} topic={child} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p className="loading-text">Loading, please wait...</p>
      </div>
    );
  }

  // Render fallback if roadmap missing or invalid
  if (!roadmap || !Array.isArray(roadmap)) {
    return (
      <div className="roadmap-container">
        <h1>Roadmap for {courseName || 'the selected course'}</h1>
        <p>No roadmap data available.</p>
      </div>
    );
  }

  return (
    <div className="roadmap-container">
      <h1>Roadmap for {courseName}</h1>
      <div className="roadmap-tree">
        {roadmap.map((topic, idx) => (
          <RoadmapNode key={idx} topic={topic} onClick={fetchTopicDetails} />
        ))}
      </div>
    </div>
  );
}
