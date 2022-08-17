export default class RedSoldier {
  static total = 40;
  constructor(x, y) {
    this.rank = "#";
    this.x = x;
    this.y = y;
    this.alive = true;
    this.color = "red";
    this.position = "";
    this.revealed = true;
  }
}
