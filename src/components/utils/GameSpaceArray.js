import Space from "../board/Space";

export default function gameBoardConstructor(
  verticalAxis,
  horizontalAxis,
  redPieces,
  bluePieces
) {
  let gameSpaceArray = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      //We have designated "lake" spaces that are not passable. Make them lightblue.
      let piece = null;
      redPieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          piece = p;
        }
      });
      bluePieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          piece = p;
        }
      });

      if (
        (i === 2 && j === 5) ||
        (i === 6 && j === 5) ||
        (i === 2 && j === 4) ||
        (i === 6 && j === 4) ||
        (i === 3 && j === 5) ||
        (i === 7 && j === 5) ||
        (i === 3 && j === 4) ||
        (i === 7 && j === 4)
      ) {
        gameSpaceArray.push(
          <Space
            key={`${i}${j}`}
            color={"blue"}
            ind={`${horizontalAxis[i]}${verticalAxis[j]}`}
          />
        );
      }
      // create checkerboard appearance
      else if ((i % 2 === 0 && j % 2 === 0) || (i % 2 > 0 && j % 2 > 0)) {
        gameSpaceArray.push(
          <Space
            key={`${i}${j}`}
            color={"green"}
            ind={`${horizontalAxis[i]}${verticalAxis[j]}`}
            pawn={piece}
          />
        );
      } else {
        gameSpaceArray.push(
          <Space
            key={`${i}${j}`}
            color={"lightgreen"}
            ind={`${horizontalAxis[i]}${verticalAxis[j]}`}
            pawn={piece}
          />
        );
      }
    }
  }
  return gameSpaceArray;
}
