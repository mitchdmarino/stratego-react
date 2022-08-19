import shuffle from "./shuffle";
class RedSoldier {
  static total = 40;
  constructor(x, y) {
    this.rank = "#";
    this.x = x;
    this.y = y;
    this.alive = true;
    this.color = "red";
    this.position = "";
    this.revealed = false;
  }
}

let redTeam = [];
for (let i = 0; i < 10; i++) {
  for (let j = 9; j > 5; j--) {
    redTeam.push(new RedSoldier(i, j));
  }
}

const redSoldierRanks = [
  1,
  2,
  3,
  3,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  8,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  "s",
  "b",
  "b",
  "b",
  "b",
  "b",
  "b",
  "f",
];
redTeam.forEach((item) => {
  item.rank = shuffle(redSoldierRanks).pop();
});

export default redTeam;
