import { useState } from "react";

export default function useVisualMode(initial) {
  // sets the mode "state" with initial mode
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition from initial mode to any other node
  function transition(newMode, replace = false) {
    setMode(newMode)
    if(!replace) {
      setHistory(prev => ([newMode, ...prev]))
    }
     // setHistory(prev => {
    //   if(replace) {
    //     prev.pop(); 
    //   }
    //   return [...prev, mode]alue: { 
    // })
  }
  // allows us to go back to previous mode
  function back() {
    if(history.length === 1) {
      setMode(initial)
    }
    setHistory(([_,...history]) => history);
    setMode(history[0]);
  }

  return { mode ,transition, back };
}