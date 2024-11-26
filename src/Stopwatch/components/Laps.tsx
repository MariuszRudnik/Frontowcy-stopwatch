interface LapsProps {
  laps: [number, number, number, number][];
}

function Laps({ laps }: LapsProps) {
  return (
    <div className="list-container">
      <ul className={laps.length === 0 ? "no_laps" : "laps"}>
        {laps.length === 0 ? (
          <li className="laps-list">Nie dodano okrążeń</li>
        ) : (
          laps.map((lap, index) => (
            <li key={index} className="laps-list">
              Okrążenie {index + 1}:{" "}
              {lap.map((time) => String(time).padStart(2, "0")).join(":")}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Laps;
