import React, { useState } from 'react';
import './Results.css';
import { useLocation } from 'react-router-dom';

export function Results(){
    const location = useLocation();
    const content = location.state?.content || "No content available";
    
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
      if (line.startsWith('##')) {
        flushList();
        elements.push(
          <h2 key={i} style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '1rem' }}>
            {line.replace(/^##\s*/, '')}
          </h2>
        );
      } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
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

  return (
    <div className="results-container">
      <h1 className="results-heading">Information</h1>
      <div className="results-content">
        {formatContent(content)}
      </div>
    </div>
  );
}