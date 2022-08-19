export default class Ruler {
  spaceIsOccupiedByTeam(x, y, teamBoardState) {
    const piece = teamBoardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  spaceIsOccupiedByOpponent(x, y, opponentBoardState) {
    const piece = opponentBoardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      console.log("no opp here");
      return false;
    }
  }

  isValidMove(
    prevX,
    prevY,
    curX,
    curY,
    piece,
    teamBoardState,
    opponentBoardState
  ) {
    if (
      this.isLakeSpace(curX, curY) ||
      curY > 9 ||
      curY < 0 ||
      curX > 9 ||
      curX < 0
    ) {
      return false;
    }
    // Normal Ranks: Pieces that can move one square in any horizontal or vertical direction
    const normalRanks = [1, 2, 3, 4, 5, 6, 7, 8, "s"];
    if (normalRanks.includes(piece.rank)) {
      if (
        (prevX === curX && Math.abs(curY - prevY) === 1) ||
        (prevY === curY && Math.abs(curX - prevX) === 1)
      ) {
        if (!this.spaceIsOccupiedByTeam(curX, curY, teamBoardState)) {
          return true;
        }
      }
    }
    // Scout (rank 9) can move as many squares as are open in one continuous horizontal or vertical direction (similar to Rook in Chess)
    if (piece.rank === 9) {
      return this.validScoutMove(
        prevX,
        prevY,
        curX,
        curY,
        teamBoardState,
        opponentBoardState
      );
    }
  }

  isLakeSpace(x, y) {
    if (
      (x === 2 && y === 5) ||
      (x === 6 && y === 5) ||
      (x === 2 && y === 4) ||
      (x === 6 && y === 4) ||
      (x === 3 && y === 5) ||
      (x === 7 && y === 5) ||
      (x === 3 && y === 4) ||
      (x === 7 && y === 4)
    )
      return true;
  }

  validScoutMove(prevX, prevY, curX, curY, teamBoardState, opponentBoardState) {
    if (
      // if X is the same, then y changed. check if Any of the Y spaces in between are occupied
      prevX === curX
    ) {
      if (curY > prevY) {
        for (let i = 1; i <= curY - prevY; i++) {
          if (
            this.spaceIsOccupiedByTeam(curX, prevY + i, teamBoardState) ||
            this.isLakeSpace(curX, prevY + i) ||
            this.spaceIsOccupiedByOpponent(
              curX,
              prevY + i - 1,
              opponentBoardState
            )
          ) {
            return false;
          }
        }
        return true;
      }
      if (curY < prevY) {
        for (let i = 1; i <= prevY - curY; i++) {
          if (
            this.spaceIsOccupiedByTeam(curX, prevY - i, teamBoardState) ||
            this.isLakeSpace(curX, prevY - i) ||
            this.spaceIsOccupiedByOpponent(
              curX,
              prevY - i + 1,
              opponentBoardState
            )
          ) {
            return false;
          }
        }
        return true;
      }
    }
    if (
      // if X is the same, then y changed. check if Any of the Y spaces in between are occupied
      prevY === curY
    ) {
      if (curX > prevX) {
        for (let i = 1; i <= curX - prevX; i++) {
          if (
            this.spaceIsOccupiedByTeam(prevX + i, curY, teamBoardState) ||
            this.isLakeSpace(prevX + i, curY) ||
            this.spaceIsOccupiedByOpponent(
              prevX + i - 1,
              curY,
              opponentBoardState
            )
          ) {
            return false;
          }
        }
        return true;
      }
      if (curX < prevX) {
        for (let i = 1; i <= prevX - curX; i++) {
          if (
            this.spaceIsOccupiedByTeam(prevX - i, curY, teamBoardState) ||
            this.isLakeSpace(prevX - i, curY) ||
            this.spaceIsOccupiedByOpponent(
              prevX - i + 1,
              curY,
              opponentBoardState
            )
          ) {
            return false;
          }
        }
        return true;
      }
    }
  }

  attackSuccessful(attacker, defender) {
    if (defender.rank === "f") {
      console.log("You win! you captured the flag!");
      return "WIN";
    }
    if (defender.rank === "b") {
      if (attacker.rank === 8) {
        console.log("Phew. Bomb defused");
        return "YES";
      } else {
        console.log("kabooooom");
        return "NO";
      }
    }
    if (attacker.rank === "s") {
      if (defender.rank === 1) {
        console.log("assasination successful");
        return "YES";
      } else if (defender.rank === "s") {
        return "TIE";
      } else {
        console.log(`spy loses to ${defender.rank}`);
        return "NO";
      }
    }
    if (defender.rank === "s") {
      return "YES";
    }
    if (attacker.rank < defender.rank) {
      console.log(`attacker ${attacker.rank} defeats ${defender.rank}`);
      return "YES";
    }
    if (attacker.rank > defender.rank) {
      console.log(`attacker ${attacker.rank} loses to ${defender.rank}`);
      return "NO";
    }
    if (attacker.rank === defender.rank) {
      console.log(`attacker ${attacker.rank} ties ${defender.rank}`);
      return "TIE";
    }
  }
}
