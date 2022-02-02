import Tool from "./Tool";

export default class Arrow extends Tool {
  constructor(canvas, loadedImg, canvasState, setCanvasState) {
    super(canvas);
    this.img = new Image();
    // this.img.src = loadedImg;
    this.canvasState = canvasState;
    this.setCanvasState = setCanvasState;
    this.arrowsArr = [...canvasState.arrowsArray];
    this.arrowData = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      offsetX: 0,
      offsetY: 0
    };

    this.listen();
    console.log('Arrow');
    // console.log(canvas);
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
    this.arrowsArr.push(this.arrowData);
    this.setCanvasState((prev) => {
      return { ...prev, arrowsArray: this.arrowsArr }
    })
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

    this.ctx.strokeStyle = this.canvasState.arrowsColor;
    this.ctx.lineWidth = this.canvasState.arrowsWidth;
    this.ctx.lineCap = 'round';

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(Math.floor(topx), Math.floor(topy));

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(Math.floor(botx), Math.floor(boty));

    this.ctx.stroke();

    this.arrowData = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      offsetX: 0,
      offsetY: 0
    };
  }
}