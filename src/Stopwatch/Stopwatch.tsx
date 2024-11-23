import { useEffect, useRef, useState } from "react";
import "./Stopwatch.scss";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const initervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {}, [isRunning]);

  function start() {}
  function stop() {}
  function reset() {}
  function lap() {}
  function formatTime() {
    return "00:00:00";
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="start-button" onClick={start}>
          Start
        </button>
        <button className="stop-button" onClick={stop}>
          Stop
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
        <button className="lap-button" onClick={lap}>
          Lap
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
