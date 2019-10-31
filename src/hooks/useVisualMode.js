import React, { useState } from "react";
import Show from "components/Appointment/Show";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
    return { 
      mode, 
      transition: (mode) => setMode(mode)
  }
}

// Transition function - assisted by Alex Wilmer(instructor)