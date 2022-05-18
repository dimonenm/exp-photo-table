export default class Arrow_entity {
  constructor() {
    this.number = 0;
    this.text = '';
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
  }

  getNumber() {
    return this.number;
  }
  getText() {
    return this.text;
  }
  getX1() {
    return this.x1;
  }
  getY1() {
    return this.y1;
  }
  getX2() {
    return this.x2;
  }
  getY2() {
    return this.y2;
  }

  setNumber(value) {
    if (typeof value === 'number') {  
      this.number = value.toString();
      return;
    }
    this.number = value;
  }
  setText(value) {
    this.text = value;
  }
  setX1(value) {
    this.x1 = value;
  }
  setY1(value) {
    this.y1 = value;
  }
  setX2(value) {
    this.x2 = value;
  }
  setY2(value) {
    this.y2 = value;
  }
}