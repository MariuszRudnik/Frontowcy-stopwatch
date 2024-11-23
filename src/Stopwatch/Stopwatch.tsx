import { useRef, useState } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const initervalRef = useRef(null);
  const startTimeRef = useRef(0);

  return <div></div>;
}

export default Stopwatch;
