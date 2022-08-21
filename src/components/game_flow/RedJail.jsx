import Soldier from "../Soldier";
import styled from "styled-components";

const Jail = styled.div`
display: flex;
border: 2px dashed white;
width: 50%;
flex-wrap: wrap;
justify-content: flex-start;
`

export default function RedJail({ redPieces }) {
  const redCaptured = redPieces.filter((p) => {
    return !p.alive;
  });

  const jailed = redCaptured.map((p) => {
    return (
      <div style={{margin: 5}}><Soldier piece={p}/></div>
    );
  });
  return <Jail>{jailed}</Jail>;
}
