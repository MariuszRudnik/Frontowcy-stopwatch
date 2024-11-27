import "./App.css";
import React from "react";
import Stopwatch from "./Stopwatch/Stopwatch.tsx";

function App() {
  console.log("App.tsx: App()");
  return (
    <React.StrictMode>
      <Stopwatch />
    </React.StrictMode>
  );
}

export default App;
