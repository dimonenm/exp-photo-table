import Tool from "./Tool";

export default class Hand extends Tool {
  constructor(canvas, loadedImg) {
    super(canvas);
    this.loadedImg = loadedImg;
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
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = 'red';
    // this.ctx.moveTo(event.offsetX, event.offsetY);
    this.startX = event.offsetX;
  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      // this.draw(event.offsetX, event.offsetY);
      this.endX = this.startX - event.offsetX;
      this.shiftImg(this.endX, this.loadedImg);
    }
  }

  // draw(x, y) {
  //   this.ctx.lineTo(x, y);
  //   this.ctx.stroke();
  // }
  shiftImg(x, lImg) {
    console.log('shiftImg');
    console.log('lImg', lImg);
    
    const img = new Image();
    img.onload = function () {

      const pr = 52500 / this.height;
      const imgW = this.width / 100 * pr;
      const imgH = this.height / 100 * pr;

      this.ctx.drawImage(img, 0 - x, 0, imgW, imgH)
    }
    img.src = lImg;

  }
}