import { useState } from "react";

export default function useVisualMode(initial) {
  // sets the mode "state" with initial mode
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition from initial mode to any other node
  function transition(newMode, replace = false) {
    if(replace) {
      history.pop();
    }
    setMode(newMode)
    setHistory([...history, newMode]);
  }
  // allows us to go back to previous mode
  function back() {
    if(history.length === 1) {
      return;
    }
    history.pop()
    setMode(history[history.length - 1]);
  }

  return { mode ,transition, back };
}