import { useEffect, useRef, useState } from "react";
import "./Stopwatch.scss";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [lapHours, setLapHours] = useState(0);
  const [lapMinutes, setLapMinutes] = useState(0);
  const [lapSeconds, setLapSeconds] = useState(0);
  const [lapMilliseconds, setLapMilliseconds] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalIdRef = useRef<null | number>(null);
  const startTimeRef = useRef(0);
  const lapStartTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const lapElapsedTime = Date.now() - lapStartTimeRef.current;

        // Set total elapsed time
        setHours(Math.floor(elapsedTime / (1000 * 60 * 60)));
        setMinutes(Math.floor((elapsedTime / (1000 * 60)) % 60));
        setSeconds(Math.floor((elapsedTime / 1000) % 60));
        setMilliseconds(Math.floor((elapsedTime % 1000) / 10));

        // Set lap elapsed time
        setLapHours(Math.floor(lapElapsedTime / (1000 * 60 * 60)));
        setLapMinutes(Math.floor((lapElapsedTime / (1000 * 60)) % 60));
        setLapSeconds(Math.floor((lapElapsedTime / 1000) % 60));
        setLapMilliseconds(Math.floor((lapElapsedTime % 1000) / 10));
      }, 100);
      return () => {
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
        }
      };
    }
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current =
      Date.now() -
      (hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds * 10);
    lapStartTimeRef.current =
      Date.now() -
      (lapHours * 3600000 +
        lapMinutes * 60000 +
        lapSeconds * 1000 +
        lapMilliseconds * 10);
  }
  function stop() {
    setIsRunning(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  }
  function reset() {
    setIsRunning(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    setLapHours(0);
    setLapMinutes(0);
    setLapSeconds(0);
    setLapMilliseconds(0);
    setLaps([]);
  }
  function lap() {
    const lapTime = [lapHours, lapMinutes, lapSeconds, lapMilliseconds];
    setLaps([...laps, lapTime]);
    lapStartTimeRef.current = Date.now();
    setLapHours(0);
    setLapMinutes(0);
    setLapSeconds(0);
    setLapMilliseconds(0);
  }

  function formatTime(hours, minutes, seconds, milliseconds) {
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  return (
    <div className="stopwatch">
      <p>Czas aktualnego okrążenia</p>
      <div className="display">
        {formatTime(lapHours, lapMinutes, lapSeconds, lapMilliseconds)}
      </div>
      <p>Czas łączny :</p>
      <div className="display-full-time">
        {formatTime(hours, minutes, seconds, milliseconds)}
      </div>
      <div className="list-contener">
        <ul className={`${laps.length === 0 ? "no_laps" : "laps"}`}>
          {laps.length === 0 ? (
            <li className="laps-list">Nie dodano okrążeń</li>
          ) : (
            laps.map((lap, index) => (
              <li key={index} className="laps-list">
                Okrążenie {index + 1}: {formatTime(...lap)}
              </li>
            ))
          )}
        </ul>
      </div>
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
