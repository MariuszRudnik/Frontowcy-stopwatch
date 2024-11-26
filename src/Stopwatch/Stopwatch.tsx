import { useEffect, useRef, useState } from "react";
import "./Stopwatch.scss";
import Display from "./components/Display.tsx";
import Laps from "./components/Laps.tsx";
import Controls from "./components/Controls.tsx";

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
  const [laps, setLaps] = useState<[number, number, number, number][]>([]);
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
    const lapTime: [number, number, number, number] = [
      lapHours,
      lapMinutes,
      lapSeconds,
      lapMilliseconds,
    ];
    setLaps([...laps, lapTime]);
    lapStartTimeRef.current = Date.now();
    setLapHours(0);
    setLapMinutes(0);
    setLapSeconds(0);
    setLapMilliseconds(0);
  }

  return (
    <div className="stopwatch">
      <Display
        label="Czas aktualnego okrążenia"
        hours={lapHours}
        minutes={lapMinutes}
        seconds={lapSeconds}
        milliseconds={lapMilliseconds}
      />
      <Display
        label="Czas łączny"
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        milliseconds={milliseconds}
      />
      <Laps laps={laps} />
      <Controls start={start} stop={stop} reset={reset} lap={lap} />
    </div>
  );
}

export default Stopwatch;
