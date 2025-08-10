import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardPage.css';

// This helper function was missing from the abbreviated code
const getFormattedDate = (date) => date.toISOString().split('T')[0];

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // All state declarations are present here
  const [assessments, setAssessments] = useState([]);
  const [moods, setMoods] = useState({});
  const [moodValue, setMoodValue] = useState(2);
  const [loading, setLoading] = useState(true);

  // These variables were also missing from the abbreviated code
  const API_URL = process.env.REACT_APP_API_URL || '';
  const moodOptions = ['😔', '😕', '😐', '🙂', '😄'];
  const today = getFormattedDate(new Date());

  // This useEffect hook is essential for fetching data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // Don't fetch if user is not yet available
      setLoading(true);
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [assessmentsRes, moodsRes] = await Promise.all([
          axios.get(`${API_URL}/api/assessments`, config),
          axios.get(`${API_URL}/api/moods`, config),
        ]);

        setAssessments(assessmentsRes.data);
        const moodsMap = moodsRes.data.reduce((acc, moodEntry) => {
          acc[moodEntry.date] = moodEntry.mood;
          return acc;
        }, {});
        setMoods(moodsMap);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, API_URL]); // Add API_URL to dependency array

  // This function is needed for the slider
  const handleMoodChange = async (newMoodIndex) => {
    setMoodValue(newMoodIndex);
    const newMoodEmoji = moodOptions[newMoodIndex];
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const moodData = { date: today, mood: newMoodEmoji };
      await axios.post(`${API_URL}/api/moods`, moodData, config);
      setMoods(prevMoods => ({ ...prevMoods, [today]: newMoodEmoji }));
    } catch (error) {
      console.error("Failed to save mood", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // This robust check prevents errors if user data is still loading
  if (!user) {
    return (
      <div style={{ color: 'var(--text-color-primary)', textAlign: 'center', paddingTop: '10rem' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
        <h2>How was your day today?</h2>
        <div className="mood-slider-container" style={{maxWidth: '100%', marginTop: '1rem'}}>
           <div className="slider-wrapper">
            <span className="mood-emoji" style={{ transform: `scale(${1 + moodValue * 0.1})` }}>
              {moodOptions[moodValue]}
            </span>
            <input
              type="range" id="mood" name="mood" min="0" max="4" step="1"
              value={moodValue}
              onChange={(e) => handleMoodChange(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card calendar-card">
          <h2>Mood Calendar</h2>
          <Calendar
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const dateString = getFormattedDate(date);
                const moodEmoji = moods[dateString];
                return moodEmoji ? <p className="mood-emoji-on-calendar">{moodEmoji}</p> : null;
              }
            }}
          />
        </div>
        <div className="dashboard-card history-card">
          <h2>Assessment History</h2>
          {loading ? ( <p>Loading...</p> ) : assessments.length > 0 ? (
            <ul className="history-list">
              {assessments.slice(0, 3).map((assessment) => (
                <li key={assessment._id} className="history-item">
                  <div className="history-item-info">
                    <span className="history-item-quiz-type">{assessment.quizType}</span>
                    <span className="history-item-date">
                      {new Date(assessment.createdAt).toLocaleDateDateString()}
                    </span>
                  </div>
                  <span className="history-item-score">{assessment.resultCategory}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No past assessments.</p>
          )}
           <Link to="/assessment" className="cta-button" style={{width: '100%', boxSizing: 'border-box', marginTop: '1rem', textAlign: 'center'}}>
            Start New Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;