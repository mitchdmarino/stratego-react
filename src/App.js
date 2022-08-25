import "./App.css";
import styled from "styled-components";

// component imports
import GameBoard from "./components/board/GameBoard";

const Title = styled.h1`
  color: white;
  text-align: center;
`;

function App() {
  return (
    <div className="container">
      <Title>Stratego</Title>
      <GameBoard />
    </div>
  );
}

export default App;
