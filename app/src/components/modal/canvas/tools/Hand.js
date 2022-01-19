import Tool from "./Tool";

export default class Hand extends Tool {
  constructor(canvas, loadedImg, canvasState, setCanvasState) {
    super(canvas);
    this.img = new Image();
    this.img.src = loadedImg;
    this.canvasState = canvasState;
    this.setCanvasState = setCanvasState;
    this.listen();
    
    this.img.onload = () => {
      this.pr = canvas.height * 100 / this.img.height;
      // this.pr = 52500 / this.img.height;
      this.imgWidth = this.img.width / 100 * this.pr;
      this.imgHeight = this.img.height / 100 * this.pr;
      this.imgOffset = (canvas.width - this.imgWidth) / 2;
      // this.imgOffset = (700 - this.imgWidth) / 2;
      this.offsetValue = 0;
      this.lastOffsetValue = this.canvasState.lastOffsetValue;
    }   

    console.log('Hand');
    console.log('canvasState - ', canvasState);
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
  }

  mouseLeaveHandler(event) {
    this.mouseDown = false;
    this.lastOffsetValue = this.offsetValue;
    // this.setCanvasState((prev) => { return { ...prev, lastOffsetValue: this.lastOffsetValue}})
  }

  mouseUpHandler(event) {
    this.mouseDown = false;
    this.lastOffsetValue = this.offsetValue;
    // this.setCanvasState((prev) => { return { ...prev, lastOffsetValue: this.lastOffsetValue}})
  }
  mouseDownHandler(event) {
    this.mouseDown = true;
    this.offsetXStart = event.offsetX;
  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.diff = event.offsetX - this.offsetXStart;

      this.offsetValue = this.lastOffsetValue + this.diff;
      if (this.offsetValue <= this.imgOffset) { this.offsetValue = this.imgOffset }
      if (this.offsetValue >= -this.imgOffset) { this.offsetValue = -this.imgOffset }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.drawImage(this.img, this.imgOffset + this.offsetValue, 0, this.imgWidth, this.imgHeight);
    }
  }
}