// src/pages/DashboardPage.js
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './DashboardPage.css';

// Helper to format date to YYYY-MM-DD
const getFormattedDate = (date) => date.toISOString().split('T')[0];

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // These are the variables from the warning
  const [assessments, setAssessments] = useState([]);
  const [moods, setMoods] = useState({});
  const [moodValue, setMoodValue] = useState(2);
  const [loading, setLoading] = useState(true); // Declared here

  const moodOptions = ['😔', '😕', '😐', '🙂', '😄'];
  const today = getFormattedDate(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [assessmentsRes, moodsRes] = await Promise.all([
          axios.get('/api/assessments', config),
          axios.get('/api/moods', config),
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
        setLoading(false); // Used here
      }
    };
    fetchData();
  }, [user]);

  const handleMoodChange = async (newMoodIndex) => {
    setMoodValue(newMoodIndex);
    const newMoodEmoji = moodOptions[newMoodIndex];
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const moodData = { date: today, mood: newMoodEmoji };
      await axios.post('/api/moods', moodData, config);
      setMoods(prevMoods => ({ ...prevMoods, [today]: newMoodEmoji }));
    } catch (error) {
      console.error("Failed to save mood", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
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
          {/* THE 'moods' VARIABLE IS NOW USED HERE */}
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
          {/* THE 'loading' AND 'assessments' VARIABLES ARE NOW USED HERE */}
          {loading ? (
            <p>Loading your history...</p>
          ) : assessments.length > 0 ? (
            <ul className="history-list">
              {assessments.map((assessment) => (
                <li key={assessment._id} className="history-item">
                  <div className="history-item-info">
                    <span className="history-item-quiz-type">{assessment.quizType} Assessment</span>
                    <span className="history-item-date">
                      Taken on {new Date(assessment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="history-item-score">{assessment.resultCategory}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no past assessments. Start one today to track your progress!</p>
          )}
           <Link to="/assessment" className="cta-button" style={{width: '100%', boxSizing: 'border-box', marginTop: '1.5rem', textAlign: 'center'}}>
            Start New Assessment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;