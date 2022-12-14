class RedSoldier {
  static total = 40;
  constructor(x, y, id) {
    this.rank = 9;
    this.id = id;
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
    const id = `${i},${j}`;
    redTeam.push(new RedSoldier(i, j, id));
  }
}

const redSoldierLayouts = [
  [
    5,
    9,
    9,
    6,
    9,
    5,
    8,
    1,
    9,
    5,
    6,
    7,
    "b",
    "s",
    2,
    9,
    4,
    4,
    3,
    9,
    7,
    "b",
    7,
    4,
    3,
    6,
    "b",
    6,
    5,
    7,
    9,
    8,
    "b",
    9,
    8,
    "b",
    "f",
    "b",
    8,
    8,
  ],
  [
    1,
    5,
    6,
    8,
    9,
    5,
    9,
    9,
    9,
    5,
    7,
    9,
    3,
    3,
    2,
    9,
    7,
    "b",
    "b",
    6,
    4,
    9,
    4,
    "s",
    5,
    6,
    "b",
    7,
    6,
    9,
    4,
    8,
    8,
    8,
    7,
    "b",
    "f",
    "b",
    "b",
    8,
  ],
  [
    5,
    9,
    7,
    2,
    5,
    9,
    9,
    1,
    9,
    5,
    6,
    9,
    4,
    6,
    "b",
    9,
    4,
    4,
    3,
    8,
    6,
    3,
    "s",
    8,
    "b",
    9,
    5,
    6,
    "f",
    "b",
    8,
    "b",
    7,
    "b",
    7,
    9,
    8,
    8,
    "b",
    7,
  ],
  [
    9,
    3,
    6,
    9,
    5,
    9,
    2,
    8,
    9,
    5,
    1,
    9,
    4,
    3,
    9,
    5,
    "b",
    6,
    "b",
    6,
    5,
    7,
    4,
    "s",
    4,
    6,
    "b",
    7,
    "b",
    7,
    8,
    9,
    8,
    8,
    7,
    "b",
    "f",
    "b",
    8,
    9,
  ],
  [
    "f",
    9,
    "b",
    9,
    "b",
    "b",
    7,
    9,
    9,
    9,
    4,
    2,
    3,
    "b",
    1,
    4,
    "b",
    8,
    3,
    4,
    6,
    7,
    5,
    5,
    8,
    8,
    5,
    9,
    5,
    6,
    9,
    7,
    8,
    6,
    9,
    "s",
    7,
    "b",
    6,
    8,
  ],
  [
    "b",
    2,
    "s",
    3,
    9,
    6,
    8,
    3,
    9,
    6,
    7,
    "b",
    8,
    5,
    4,
    1,
    9,
    9,
    4,
    9,
    "b",
    7,
    "b",
    9,
    9,
    6,
    7,
    5,
    9,
    5,
    "f",
    "b",
    7,
    "b",
    5,
    8,
    8,
    8,
    6,
    4,
  ],
  [
    9,
    9,
    8,
    4,
    "b",
    "b",
    7,
    7,
    "b",
    "b",
    2,
    3,
    "s",
    8,
    5,
    3,
    5,
    5,
    4,
    7,
    "b",
    1,
    6,
    8,
    8,
    4,
    5,
    6,
    6,
    6,
    "f",
    "b",
    9,
    9,
    9,
    9,
    9,
    9,
    8,
    7,
  ],
];
let randomLayout = Math.floor(Math.random() * 7);
redTeam.forEach((item) => {
  item.rank = redSoldierLayouts[randomLayout].shift();
});
export default redTeam;
