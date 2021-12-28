import Tool from "./Tool";

export default class Hand extends Tool {
  constructor(canvas, loadedImg) {
    super(canvas);
    this.loadedImgBlob = loadedImg;
    this.listen();
    this.loadedImgTag = this.loadImgToCanvas(this.loadedImgBlob)
    
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

  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {

      const img = new Image();
      img.src = this.loadedImgBlob;
      img.onload = () => this.ctx.drawImage(img, event.offsetX, 0);
    }
  }

  // draw(x, y) {
  //   this.ctx.lineTo(x, y);
  //   this.ctx.stroke();
  // }
  shiftImg(loadedImgTag) {
    
    this.ctx.drawImage(this.loadedImgTag, 0, 0);
    // this.ctx.drawImage(this.loadedImgBlob, 0, 0);
  }

  async loadImgToCanvas(lImg) {
    const img = await this.loadImgToObj(lImg);
    console.log('img: ', img);
    return img;
  }

  loadImgToObj(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    })
  }
}