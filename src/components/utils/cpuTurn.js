export default function cpuTurn(
  playerTurn,
  setRedPieces,
  redPieces,
  setBluePieces,
  bluePieces,
  ruler
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
    const randomDirection = Math.floor(Math.random() * 3);

    if (randomDirection === 0) {
      const num = randomSoldier.x - 1;
      const validMove = ruler.isValidMove(
        randomSoldier.x,
        randomSoldier.y,
        randomSoldier.x - 1,
        randomSoldier.y,
        randomSoldier,
        redPieces
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
                if (redWon === "YES") {
                  p.x = num;
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
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
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
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
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
                } else if (redWon === "WIN") {
                  console.log("the game is won");
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
    if (randomDirection === 2) {
      const num = randomSoldier.y - 1;
      const validMove = ruler.isValidMove(
        randomSoldier.x,
        randomSoldier.y,
        randomSoldier.x,
        randomSoldier.y - 1,
        randomSoldier,
        redPieces
      );
      if (validMove) {
        setRedPieces((value) => {
          const pieces = value.map((p) => {
            if (p.x === randomSoldier.x && p.y === randomSoldier.y) {
              const opp = bluePieces.filter((blue) => {
                return blue.x === p.x && blue.y === num;
              });
              if (opp[0]) {
                const redWon = ruler.attackSuccessful(p, opp[0]);
                if (redWon === "YES") {
                  p.y = num;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === p.x && bluepiece.y === num) {
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
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
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
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
                  setBluePieces((value) => {
                    const bluePieces = value.map((bluepiece) => {
                      if (bluepiece.x === p.x && bluepiece.y === num) {
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
    }
    if (randomDirection === 1) {
      const num = randomSoldier.x + 1;
      const validMove = ruler.isValidMove(
        randomSoldier.x,
        randomSoldier.y,
        randomSoldier.x + 1,
        randomSoldier.y,
        randomSoldier,
        redPieces
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
                if (redWon === "YES") {
                  p.x = num;
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
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
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
                  p.x = -9999;
                  p.y = -9999;
                  p.alive = false;
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
                } else if (redWon === "WIN") {
                  console.log("the game is won");
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
