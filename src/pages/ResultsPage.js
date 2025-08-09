// src/pages/ResultsPage.js (UPGRADED)
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './ResultsPage.css'; // Your existing CSS is fine

const ResultsPage = () => {
  const location = useLocation();
  const { score, resultCategory } = location.state || {};

  // --- NEW: State for fetched resources ---
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NEW: Fetch resources when the page loads ---
  useEffect(() => {
    const fetchResources = async () => {
      if (!resultCategory) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/resources?category=${resultCategory}`);
        // Also fetch general resources and combine them
        const { data: generalData } = await axios.get('/api/resources?category=General');
        setResources([...data, ...generalData]);
      } catch (error) {
        console.error("Failed to fetch resources for results", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [resultCategory]);


  if (!score && score !== 0) {
    // ... (this part remains the same)
  }

  return (
    <div className="results-container">
      <h1>Your Assessment Results</h1>
      <div className="score-card">
        {/* ... score card content is the same ... */}
         <p className="score-label">Your GAD-7 Score</p>
        <p className="score-value">{score}</p>
        <p className="score-category">{resultCategory} Anxiety</p>
      </div>

      {/* --- NEW: Dynamic Guidance & Resources Section --- */}
      <div className="guidance-card">
        <h2>Recommended Next Steps</h2>
        {loading ? (
          <p>Loading personalized guidance...</p>
        ) : resources.length > 0 ? (
          <ul className="resources-list-results">
            {resources.map(resource => (
              <li key={resource._id}>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  <strong>{resource.title}</strong>: {resource.description}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No specific resources found, but remember that practicing general wellness is always a great next step.</p>
        )}
      </div>

      <Link to="/dashboard" className="cta-button" style={{marginRight: '1rem'}}>Back to Dashboard</Link>
      <Link to="/resources" className="cta-button" style={{background: 'var(--card-bg-color)', color: 'var(--text-color-primary)', border: '1px solid var(--border-color)'}}>
        Explore All Resources
      </Link>
    </div>
  );
};

export default ResultsPage;