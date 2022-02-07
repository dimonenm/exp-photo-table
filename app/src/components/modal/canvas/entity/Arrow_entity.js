export default class Arrow_entity {
  constructor(num) {
    this.num = num;
    this.text = '';
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
  }
  get num() {
    return this.num;
  }
  get text() {
    return this.text;
  }
  get x1() {
    return this.x1;
  }
  get y1() {
    return this.y1;
  }
  get x2() {
    return this.x2;
  }
  get y2() {
    return this.y2;
  }

  set num(value) {
    this.num = value;
  }
  set text(value) {
    this.text = value;
  }
  set x1(value) {
    this.x1 = value;
  }
  set y1(value) {
    this.y1 = value;
  }
  set x2(value) {
    this.x2 = value;
  }
  set y2(value) {
    this.y2 = value;
  }
}