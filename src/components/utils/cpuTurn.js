export default function cpuTurn(
  playerTurn,
  setRedPieces,
  redPieces,
  setBluePieces,
  bluePieces,
  ruler,
  setMessage
) {
  while (!playerTurn) {
    const randomSoldier =
      redPieces[Math.floor(Math.random() * redPieces.length)];

    if (randomSoldier.rank === "f" || randomSoldier.rank === "b") {
      // restart the while loop
      continue;
    }
    if (randomSoldier.alive === false) {
      continue;
    }
    const randomDirection = Math.floor(Math.random() * 10);

    if (randomDirection < 3) {
      const num = randomSoldier.x - 1;
      const validMove = ruler.isValidMove(
        randomSoldier.x,
        randomSoldier.y,
        randomSoldier.x - 1,
        randomSoldier.y,
        randomSoldier,
        redPieces,
        bluePieces
      );
      if (validMove) {
        setRedPieces((value) => {
          const pieces = value.map((p) => {
            if (p.x === randomSoldier.x && p.y === randomSoldier.y) {
              const opp = bluePieces.filter((blue) => {
                return blue.x === num && blue.y === p.y;
              });
              if (opp[0]) {
                const redWon = ruler.attackSuccessful(p, opp[0]);
                const oppID = opp[0].id;
                if (redWon === "YES") {
                  setMessage(`Red ${p.rank} defeats Blue ${opp[0].rank}`);
                  p.x = num;
                  p.revealed = true;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === num && bluepiece.y === p.y) {
                        bluepiece.x = -9999;
                        bluepiece.y = -9999;
                        bluepiece.alive = false;
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "NO") {
                  setMessage(
                    `Red ${p.rank} is defeated by Blue ${opp[0].rank}`
                  );
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  p.revealed = true;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === num && bluepiece.y === p.y) {
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "TIE") {
                  setMessage(`Red ${p.rank} and ${opp[0].rank} both lose`);
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.id === oppID) {
                        bluepiece.x = -9999;
                        bluepiece.y = -9999;
                        bluepiece.alive = false;
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "WIN") {
                  setMessage(`GAME OVER! Your flag has been captured!`);
                }
              }
              p.x = num;
            }

            return p;
          });
          return pieces;
        });
        playerTurn = true;
      } else {
        continue;
      }
    } else if (randomDirection < 7) {
      const num = randomSoldier.y - 1;
      const numX = randomSoldier.x;
      const validMove = ruler.isValidMove(
        randomSoldier.x,
        randomSoldier.y,
        randomSoldier.x,
        randomSoldier.y - 1,
        randomSoldier,
        redPieces,
        bluePieces
      );
      if (validMove) {
        setRedPieces((value) => {
          const pieces = value.map((p) => {
            if (p.x === randomSoldier.x && p.y === randomSoldier.y) {
              const opp = bluePieces.filter((blue) => {
                return blue.x === p.x && blue.y === num;
              });
              if (opp[0]) {
                p.revealed = true;
                const oppID = opp[0].id;
                console.log("red attacked");
                const redWon = ruler.attackSuccessful(p, opp[0]);
                if (redWon === "YES") {
                  setMessage(`Red ${p.rank} defeats Blue ${opp[0].rank}`);
                  p.y = num;
                  p.revealed = true;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === numX && bluepiece.y === num) {
                        bluepiece.x = -9999;
                        bluepiece.y = -9999;
                        bluepiece.alive = false;
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "NO") {
                  setMessage(
                    `Red ${p.rank} is defeated by Blue ${opp[0].rank}`
                  );
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  p.revealed = true;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === p.x && bluepiece.y === num) {
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "TIE") {
                  setMessage(
                    `Red ${p.rank} and Blue ${opp[0].rank} both lose.`
                  );
                  console.log(p.x, num);
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.id === oppID) {
                        bluepiece.x = -9999;
                        bluepiece.y = -9999;
                        bluepiece.alive = false;
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  return p;
                } else if (redWon === "WIN") {
                  console.log("the game is won");
                  setMessage(`GAME OVER, your flag has been captured!`);
                }
              }
              p.y = num;
            }

            return p;
          });
          return pieces;
        });
        playerTurn = true;
      } else {
        continue;
      }
    } else {
      const num = randomSoldier.x + 1;
      const validMove = ruler.isValidMove(
        randomSoldier.x,
        randomSoldier.y,
        randomSoldier.x + 1,
        randomSoldier.y,
        randomSoldier,
        redPieces,
        bluePieces
      );
      if (validMove) {
        setRedPieces((value) => {
          const pieces = value.map((p) => {
            if (p.x === randomSoldier.x && p.y === randomSoldier.y) {
              const opp = bluePieces.filter((blue) => {
                return blue.x === num && blue.y === p.y;
              });
              if (opp[0]) {
                const redWon = ruler.attackSuccessful(p, opp[0]);
                const oppID = opp[0].id;
                if (redWon === "YES") {
                  setMessage(`Red ${p.rank} defeats Blue ${opp[0].rank}`);
                  p.x = num;
                  p.revealed = true;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === num && bluepiece.y === p.y) {
                        bluepiece.x = -9999;
                        bluepiece.y = -9999;
                        bluepiece.alive = false;
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "NO") {
                  setMessage(
                    `Red ${p.rank} is defeated by Blue ${opp[0].rank}`
                  );
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  p.revealed = true;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === num && bluepiece.y === p.y) {
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "TIE") {
                  setMessage(
                    `Red ${p.rank} and Blue ${opp[0].rank} both lose.`
                  );
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.id === oppID) {
                        bluepiece.x = -9999;
                        bluepiece.y = -9999;
                        bluepiece.alive = false;
                        bluepiece.revealed = true;
                      }
                      return bluepiece;
                    });
                    return bluePieces;
                  });
                  return p;
                } else if (redWon === "WIN") {
                  console.log("the game is won");
                  setMessage(`GAME OVER, your flag has been captured!`);
                }
              }
              p.x = num;
            }

            return p;
          });
          return pieces;
        });
        playerTurn = true;
      } else {
        continue;
      }
    }
  }
}
