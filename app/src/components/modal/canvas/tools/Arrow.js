import Tool from "./Tool";

export default class Arrow extends Tool {
  constructor(canvas) {
    super(canvas);
    this.img = new Image();

    this.listen();
    console.log('Arrow');
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
  }

  mouseLeaveHandler(event) {
    this.mouseDown = false;
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
    this.img.src = this.saved;
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    const lineangle = Math.atan2(y2 - y1, x2 - x1);
    // console.log('lineangle: ', lineangle);
    // const d = 20;
    const d = (Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)) / 100) * 50;
    // const angle = Math.PI / 12;
    const angle = ((Math.PI / 2) * 25) / 100;
    const h = Math.abs((d > 20 ? 20 : d) / Math.cos(angle));
    // const h = 20;

    // const angle1 = lineangle + Math.PI + angle;
    const angle1 = lineangle + angle;
    const topx = x1 + Math.cos(angle1) * h;
    const topy = y1 + Math.sin(angle1) * h;

    const angle2 = lineangle - angle;
    const botx = x1 + Math.cos(angle2) * h;
    const boty = y1 + Math.sin(angle2) * h;

    this.ctx.beginPath();

    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(Math.floor(topx), Math.floor(topy));

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(botx, boty);

    this.ctx.stroke();

  }
}