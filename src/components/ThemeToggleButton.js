// src/components/ThemeToggleButton.js
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-button" onClick={toggleTheme}>
      <motion.div className="toggle-thumb" layout transition={{ type: 'spring', stiffness: 700, damping: 30 }} />
    </div>
  );
};

export default ThemeToggleButton;