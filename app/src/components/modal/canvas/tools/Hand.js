import Tool from "./Tool";

export default class Hand extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
    console.log('Hand');
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(event) {
    this.mouseDown = false;
  }
  mouseDownHandler(event) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'red';
    this.ctx.moveTo(event.offsetX, event.offsetY);

  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.draw(event.offsetX, event.offsetY);
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}