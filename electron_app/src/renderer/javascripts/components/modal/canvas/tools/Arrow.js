import Tool from "./Tool";
import drawArrowArray from '../../../../services/forModalCanvas/fDrawArrowArray';
import Arrow_entity from '../../../../entities/Arrow_entity';
import GallaryImage from "../../../../entities/GalleryImage";

export default class Arrow extends Tool {
  constructor(canvas, galleryImg, setGalleryImg) {
    super(canvas);
    this.img = new Image();
    this.galleryImg = galleryImg;
    this.setGalleryImg = setGalleryImg;
    this.arrowsArr = [...galleryImg.getArrowsArray()];
    this.arrowData = null;

    this.listen();
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
    this.setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: this.arrowsArr })
    });
    this.arrowData = null;
  }
  mouseDownHandler(event) {
    this.mouseDown = true;
    this.arrowData = new Arrow_entity();

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

    if(x2 < 40) x2 = 40
    if (x2 > (this.canvas.width - 40)) x2 = this.canvas.width - 40
    if(y2 < 40) y2 = 40
    if (y2 > (this.canvas.height - 40)) y2 = this.canvas.height - 40

    drawArrowArray(this.ctx, this.arrowData.getNumber(), this.galleryImg.getArrowsColor(), this.galleryImg.getArrowsWidth(), x1, y1, x2, y2);

    this.arrowData.setNumber(this.arrowsArr.length + 1);
    this.arrowData.setX1(x1);
    this.arrowData.setY1(y1);
    this.arrowData.setX2(x2);    
    this.arrowData.setY2(y2);    
    

    console.log('x2 - ', x2);
    console.log('y2 - ', y2);
    console.log('this.canvas.width - ', this.canvas.width);
    console.log('this.canvas.height - ', this.canvas.height);
    console.log('this.arrowData.getNumber() - ', this.arrowData.getNumber());
    console.log('this.arrowData.getX2() - ', this.arrowData.getX2());
    console.log('this.arrowData.getY2() - ', this.arrowData.getY2());
  }
}