// src/pages/ResourcesPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './ResourcesPage.css'; // We'll create this

const categories = ['General', 'Mild', 'Moderate', 'Severe'];

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchResources = async () => {
      if (!user) return;
      setLoading(true);
      try {
        // We use the public GET /api/resources endpoint
        const { data } = await axios.get(`/api/resources?category=${selectedCategory}`);
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [selectedCategory, user]);

  return (
    <div className="resources-container">
      <h1>Support & Guidance Resources</h1>
      <p>Explore curated articles, tools, and exercises to support your wellness journey.</p>
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="resources-grid">
        {loading ? (
          <p>Loading resources...</p>
        ) : resources.length > 0 ? (
          resources.map(resource => (
            <a key={resource._id} href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-card">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span>Read More →</span>
            </a>
          ))
        ) : (
          <p>No resources found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;