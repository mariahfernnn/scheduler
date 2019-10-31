import React, { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(mode, replace = false) {
    if (replace) {
      history.splice(0, 1)
    }
    setHistory(history => [mode, ...history])
    setMode(mode)
  }

  function back() {
    if (history.length === 1) {
      return;
    }
    setHistory(prev => {
      (history.splice(0, 1));
      setMode(prev[0]);
      return[...prev];
    })
  }
  
  return { 
    mode, 
    transition,
    back
  }
}


// Transition function - assisted by Alex Wilmer(instructor)
// Avoid using push/pop in React!!! - use the spread 
// Back function - assisted by Vasily Klimkin(mentor)