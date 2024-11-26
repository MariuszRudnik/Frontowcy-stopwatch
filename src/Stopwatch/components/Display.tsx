interface DisplayProps {
  label: string;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

function Display({
  label,
  hours,
  minutes,
  seconds,
  milliseconds,
}: DisplayProps) {
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  return (
    <div>
      <p>{label}</p>
      <div className="display">
        <div className="display-time">
          {formattedHours}:{formattedMinutes}:{formattedSeconds}:
          {formattedMilliseconds}
        </div>
      </div>
    </div>
  );
}

export default Display;
