export default class BlueSoldier {
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
