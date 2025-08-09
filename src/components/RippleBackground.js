// src/components/RippleBackground.js
import React, { useState, useCallback } from 'react';

const RippleBackground = () => {
  // We will store an array of our ripple elements in state
  const [ripples, setRipples] = useState([]);

  // This function will run on every mouse move over the container
  const handleMouseMove = useCallback((event) => {
    // We get the mouse position relative to the container itself
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    // Create a new ripple object with a unique key and position
    const newRipple = {
      x,
      y,
      key: Date.now(), // A simple unique key
    };

    // Add the new ripple to our array of ripples
    // We also keep the array from getting too large by slicing it
    setRipples(prevRipples => [...prevRipples.slice(-20), newRipple]);
  }, []);

  return (
    <div
      className="ripple-background-container"
      onMouseMove={handleMouseMove}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="ripple-element"
          style={{
            top: `${ripple.y}px`,
            left: `${ripple.x}px`,
          }}
        />
      ))}
    </div>
  );
};

export default RippleBackground;
