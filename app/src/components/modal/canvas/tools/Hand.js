import Tool from "./Tool";

export default class Hand extends Tool {
  constructor(canvas, loadedImg, canvasState, setCanvasState) {
    super(canvas);
    this.img = new Image();
    this.img.src = loadedImg;
    this.canvasState = canvasState;
    this.setCanvasState = setCanvasState;
    this.arrowsArr = [...canvasState.arrowsArray];
    this.listen();
    
    this.img.onload = () => {
      this.pr = canvas.height * 100 / this.img.height;
      this.zoom = +this.canvasState.zoom / 100;
      this.imgWidth = (this.img.width / 100 * this.pr) * this.zoom;
      this.imgHeight = (this.img.height / 100 * this.pr) * this.zoom;
      this.imgOffsetX = (canvas.width - this.imgWidth) / 2;
      this.imgOffsetY = (canvas.height - this.imgHeight) / 2;
      this.offsetValueX = 0;
      this.offsetValueY = 0;
      this.lastOffsetValueX = this.canvasState.lastOffsetValueX;
      this.lastOffsetValueY = this.canvasState.lastOffsetValueY;
    }   

    console.log('Hand');
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
    this.lastOffsetValueX = this.offsetValueX;
    this.lastOffsetValueY = this.offsetValueY;
    if (this.arrowsArr.length > 0) {

      for (const item of this.arrowsArr) {
        item.offsetX = this.imgOffsetX + this.offsetValueX;
        item.offsetY = this.imgOffsetY + this.offsetValueY;
      }      
    }
    this.setCanvasState((prev) => { return { ...prev, arrowsArray: this.arrowsArr, lastOffsetValueX: this.lastOffsetValueX, lastOffsetValueY: this.lastOffsetValueY}})
  }
  mouseDownHandler(event) {
    this.mouseDown = true;
    this.offsetXStart = event.offsetX;
    this.offsetYStart = event.offsetY;
  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.diffX = event.offsetX - this.offsetXStart;
      this.diffY = event.offsetY - this.offsetYStart;

      this.offsetValueX = this.lastOffsetValueX + this.diffX;
      if (this.offsetValueX <= this.imgOffsetX) { this.offsetValueX = this.imgOffsetX }
      if (this.offsetValueX >= -this.imgOffsetX) { this.offsetValueX = -this.imgOffsetX }

      this.offsetValueY = this.lastOffsetValueY + this.diffY;
      if (this.offsetValueY <= this.imgOffsetY) { this.offsetValueY = this.imgOffsetY }
      if (this.offsetValueY >= -this.imgOffsetY) { this.offsetValueY = -this.imgOffsetY }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.drawImage(this.img, this.imgOffsetX + this.offsetValueX, this.imgOffsetY + this.offsetValueY, this.imgWidth, this.imgHeight);

    }
  }
}