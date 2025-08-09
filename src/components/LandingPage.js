import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import groupPhoto from '../assets/group-photo.png'; // Make sure this path is correct
import ThemeToggleButton from './ThemeToggleButton';

// --- Data for dynamic components ---
const moodPalettes = {
  sad: { color1: '#5a7a9d', color2: '#8a95b3' },
  unsettled: { color1: '#a88a9f', color2: '#c0a7b8' },
  neutral: { color1: '#8a95b3', color2: '#a8a6ff' },
  happy: { color1: '#a8a6ff', color2: '#e6c8c4' },
  joyful: { color1: '#e6c8c4', color2: '#f0d8a8' }
};

const quotes = [
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Understanding is the first step to acceptance, and only with acceptance can there be recovery.", author: "J.K. Rowling" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" }
];

// --- Main Landing Page Component ---
const LandingPage = () => {
  const [moodValue, setMoodValue] = useState(2);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const moods = ['😔', '😕', '😐', '🙂', '😄'];
  const moodKeys = ['sad', 'unsettled', 'neutral', 'happy', 'joyful'];

  const currentPalette = moodPalettes[moodKeys[moodValue]];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <div className="aurora-background">
        <motion.div className="aurora-shape aurora-shape-1" animate={{ backgroundColor: currentPalette.color1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
        <motion.div className="aurora-shape aurora-shape-2" animate={{ backgroundColor: currentPalette.color2 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
      </div>

      <div className="page-container">
        <nav className="navbar">
          <a href="/" className="logo-container">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="16" r="8" fill="url(#logo-gradient-1)" opacity="0.8"/>
              <circle cx="20" cy="16" r="8" fill="url(#logo-gradient-2)" opacity="0.8"/>
              <defs>
                <linearGradient id="logo-gradient-1" x1="4" y1="16" x2="20" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#a8a6ff"/><stop offset="1" stopColor="#e6c8c4"/></linearGradient>
                <linearGradient id="logo-gradient-2" x1="12" y1="16" x2="28" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#e6c8c4"/><stop offset="1" stopColor="#a8a6ff" stopOpacity="0.5"/></linearGradient>
              </defs>
            </svg>
            <span className="logo-text">PsyNova</span>
          </a>
          <div className="nav-buttons">
  <a href="/resources" className="nav-login">Resources</a>{/* <-- ADDED THIS LINK */}
   <ThemeToggleButton /> {/* <-- ADD THE TOGGLE BUTTON */} 
  <a href="/login" className="nav-login">Login</a>
  <a href="/register" className="nav-signup">Sign Up</a>
</div>
        </nav>

        <main>
           {/* --- RESTRUCTURED Hero Section for correct image placement --- */}
 {/* --- RESTRUCTURED Two-Column Hero Section --- */}
  <section className="hero-section">
    {/* Left Column: Text and Button */}
    <div className="hero-text-content">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Understand Your Mind. <br />
        <span className="gradient-text">Find Your Path.</span>
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        A confidential space to gain clarity on your mental health through evidence-based assessments and personalized guidance.
      </motion.p>

      <motion.a
        href="/assessment"
        className="cta-button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Take a Free Assessment
      </motion.a>
    </div>

    {/* Right Column: Image */}
    <div className="hero-image-content">
      <motion.img
        src={groupPhoto}
        alt="Illustration of a supportive group"
        className="hero-main-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </section>

 
          <motion.section className="mood-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={cardVariants}>
            <div className="mood-slider-container">
              <label htmlFor="mood" className="mood-label">First, how are you feeling today?</label>
              <div className="slider-wrapper">
                <span className="mood-emoji" style={{ transform: `scale(${1 + moodValue * 0.1})` }}>{moods[moodValue]}</span>
                <input type="range" id="mood" name="mood" min="0" max="4" step="1" value={moodValue} onChange={(e) => setMoodValue(parseInt(e.target.value))} />
              </div>
            </div>
          </motion.section>

          <section className="bento-section">
            <motion.div className="bento-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.15 }}>
              <motion.div className="bento-card" variants={cardVariants}>
                <div className="bento-icon">🔬</div>
                <div><h3 className="bento-title">Evidence-Based</h3><p className="bento-description">Utilizing clinically validated tools like PHQ-9 & GAD-7.</p></div>
              </motion.div>
              <motion.div className="bento-card" variants={cardVariants}>
                <div className="bento-icon">🛡️</div>
                <div><h3 className="bento-title">Absolute Privacy</h3><p className="bento-description">Your data is encrypted and yours alone. We believe in total confidentiality.</p></div>
              </motion.div>
              <motion.div className="bento-card" variants={cardVariants}>
                <div className="bento-icon">🧭</div>
                <div><h3 className="bento-title">Personalized Guidance</h3><p className="bento-description">Receive curated resources and next steps based on your results.</p></div>
              </motion.div>
              <motion.div className="bento-card" variants={cardVariants}>
                <div className="bento-icon">📈</div>
                <div><h3 className="bento-title">Track Your Journey</h3><p className="bento-description">See your progress over time on a private, personal dashboard.</p></div>
              </motion.div>
            </motion.div>
          </section>

           <motion.section
            className="testimonial-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 1 }}
          >
            <div className="testimonial-container"> {/* <-- WRAP IN CONTAINER */}
              <div className="testimonial-quote-wrapper">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentQuoteIndex}
                    className="testimonial-quote"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    "{quotes[currentQuoteIndex].text}"
                    <span className="testimonial-author">- {quotes[currentQuoteIndex].author}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="footer">
          <a href="/" className="logo-text">PsyNova</a>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact</a>
          </div>
          <p className="footer-disclaimer">
            Disclaimer: PsyNova is an informational tool and not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;