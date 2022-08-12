import "./App.css";

// component imports
import GameBoard from "./components/game/GameBoard";

function App() {
  return (
    <div className="container">
      <h1>Stratego</h1>
      <GameBoard />
    </div>
  );
}

export default App;
