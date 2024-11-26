interface ControlsProps {
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
}

function Controls({ start, stop, reset, lap }: ControlsProps) {
  return (
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
  );
}

export default Controls;
