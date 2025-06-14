import React from 'react';
import './SearchResults.css';
import { useLocation } from 'react-router-dom';

export function SearchResults() {
  const location = useLocation();
  const { content, websites, youtubeLinks,title } = location.state || {};

  const youtube = Array.isArray(youtubeLinks) ? youtubeLinks : youtubeLinks?.result || [];
  const siteList = Array.isArray(websites) ? websites : websites?.result || [];

  function formatContent(content) {
    const lines = content.split('\n');
    const elements = [];
    let listItems = [];

    function flushList() {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            {listItems.map((item, idx) => (
              <li key={idx} style={{ lineHeight: 1.6 }}>{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    }

    lines.forEach((line, i) => {
      if (line.trim().startsWith('##')) {
        flushList();
        elements.push(
          <h2 key={i} style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>
            {line.trim().replace(/^##\s*/, '')}
          </h2>
        );
      }
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        listItems.push(line.trim().slice(2));
      } else if (line.trim() === '') {
        flushList();
        elements.push(<br key={`br-${i}`} />);
      } else {
        flushList();
        elements.push(
          <p key={i} style={{ whiteSpace: 'pre-wrap', margin: '0 0 1rem 0', lineHeight: 1.6 }}>
            {line}
          </p>
        );
      }
    });

    flushList();
    return elements;
  }

  function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const contentText = typeof content === 'string' ? content : content?.response || '';

  return (
    <div className="results-container column-view">
      <div className="section-box fade-in">
        <h2 className="results-heading" >{title}</h2>
        <div className="results-content">
          {formatContent(contentText)}
        </div>
      </div>

      <div className="section-box fade-in">
        <h2 className="results-heading">🎬 Recommended YouTube Videos</h2>
        <div className="youtube-grid">
          {youtube.map((video, i) => {
            const videoId = getYouTubeVideoId(video);
            return videoId ? (
              <a
                key={i}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-box"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt="YouTube thumbnail"
                />
              </a>
            ) : null;
          })}
        </div>
      </div>

      <div className="section-box fade-in">
        <h2 className="results-heading">🔗 Useful Websites</h2>
        <ul className="link-list">
          {siteList.map((site, i) => (
            <li key={i} className="link-item">
              <a href={site} target="_blank" rel="noopener noreferrer">{site}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
