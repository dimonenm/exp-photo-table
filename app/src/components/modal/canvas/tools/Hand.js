import Tool from "./Tool";

export default class Hand extends Tool {
  constructor(canvas, loadedImg) {
    super(canvas);
    this.loadedImgBlob = loadedImg;
    this.img = new Image();
    this.listen();

    console.log('Hand');
    console.log({ canvas });
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

  }
  mouseMoveHandler(event) {
    if (this.mouseDown) {
      this.shiftImg(event.offsetX);
    }
  }

  shiftImg(x) {
    this.img.src = this.loadedImgBlob;

    this.img.onload = () => {
      const i = this.img;
      // console.log('this.img: ', { i });

      const pr = 52500 / this.img.height;
      const imgW = this.img.width / 100 * pr;
      const imgH = this.img.height / 100 * pr;
      console.log('imgWb', this.img.width);
      console.log('imgWs', imgW);
      console.log('x', x);
      console.log('(700 - imgW + (x - 350)) / 2', (700 - imgW + (x - 350)) / 2);
      console.log('(x - 350)', (x - 350));

      this.ctx.clearRect(0, 0, 700, 525);

      this.ctx.drawImage(this.img, (700 - imgW + (x - 350)) / 2, 0, imgW, imgH);
      // this.ctx.drawImage(this.img, x, 0, 700, 525);
    };
  }
}