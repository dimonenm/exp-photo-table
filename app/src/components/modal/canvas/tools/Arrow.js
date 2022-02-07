import Tool from "./Tool";
import drawArrowArray from '../../../../services/forModalCanvas/fDrawArrowArray';
import Arrow_entity from '../entity/Arrow_entity';

export default class Arrow extends Tool {
  constructor(canvas, loadedImg, canvasState, setCanvasState) {
    super(canvas);
    this.img = new Image();
    // this.img.src = loadedImg;
    this.canvasState = canvasState;
    this.setCanvasState = setCanvasState;
    this.arrowsArr = [...canvasState.arrowsArray];
    this.arrowArrLength = this.arrowsArr.length + 1;
    this.arrowData = {
      num: 0,
      text: '',
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };
    this.arrowData2 = new Arrow_entity(this.arrowArrLength);

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

    drawArrowArray(this.ctx, this.arrowData.num, this.canvasState.arrowsColor, this.canvasState.arrowsWidth, x1, y1, x2, y2);

    this.arrowData = {
      num: this.arrowsArr.length + 1,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
    };
  }
}