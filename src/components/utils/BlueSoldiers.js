import shuffle from "./shuffle";

class BlueSoldier {
  static total = 40;
  constructor(x, y) {
    this.rank = "#";
    this.x = x;
    this.y = y;
    this.alive = true;
    this.color = "blue";
    this.position = "";
    this.revealed = true;
  }
}

let blueTeam = [];
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 4; j++) {
    blueTeam.push(new BlueSoldier(i, j));
  }
}

const blueSoldierRanks = [
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
blueTeam.forEach((item) => {
  item.rank = shuffle(blueSoldierRanks).pop();
});

export default blueTeam;
