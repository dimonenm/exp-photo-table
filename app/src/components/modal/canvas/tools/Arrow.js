import Tool from "./Tool";

export default class Arrow extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
    console.log('Arrow');
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

    this.startX = event.offsetX;
    this.startY = event.offsetY;

    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.draw(this.startX, this.startY, event.offsetX, event.offsetY);
    }
  }

  draw(x1, y1, x2, y2) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }
}