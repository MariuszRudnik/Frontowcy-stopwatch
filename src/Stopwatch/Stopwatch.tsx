import { useEffect, useRef, useState } from "react";
import "./Stopwatch.scss";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef<null | number>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
      return () => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      };
    }
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    console.log(startTimeRef.current);
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
    setElapsedTime(0);
  }
  function lap() {}
  function formatTime() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  return (
    <div className="stopwatch">
      <p>Czas aktualnego okrązenia</p>
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
      <p>Czas łaczny : </p>
      <div className="display-full-time">{formatTime()}</div>
      <div className="list-contener">
        <ul className="laps">
          <li className="laps-list">00:00:00:00</li>
          <li className="laps-list">00:00:00:00</li>
          <li className="laps-list">00:00:00:00</li>
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;
