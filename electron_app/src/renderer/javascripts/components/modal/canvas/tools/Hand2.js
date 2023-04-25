import Tool from "./Tool";
import GallaryImage from "../../../../entities/GalleryImage";

export default class Hand2 extends Tool {
  constructor(canvas, img, canvasSize, galleryImg, setGalleryImg, scaleGridCanvas) {
    super(canvas);
    this.img = img;
    this.galleryImg = galleryImg;
    this.setGalleryImg = setGalleryImg;
    this.scaleGridCanvas = scaleGridCanvas;
    
    this.ctx.canvas.width = canvasSize.width
    this.ctx.canvas.height = canvasSize.height
    
    this.pr = this.ctx.canvas.height * 100 / this.img.height;
    this.zoom = +this.galleryImg.getZoom() / 100;
    this.imgWidth = (this.img.width / 100 * this.pr) * this.zoom;
    this.imgHeight = (this.img.height / 100 * this.pr) * this.zoom;
    this.imgOffsetX = (this.ctx.canvas.width - this.imgWidth) / 2;
    this.imgOffsetY = (this.ctx.canvas.height - this.imgHeight) / 2;
    this.offsetValueX = 0;
    this.offsetValueY = 0;
    this.lastOffsetValueX = this.galleryImg.getLastOffsetValueX();
    this.lastOffsetValueY = this.galleryImg.getLastOffsetValueY();

    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
    this.canvas.onmouseenter = this.mouseEnterHandler.bind(this);

    this.scaleGridCanvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.scaleGridCanvas.onmousedown = this.mouseDownHandler.bind(this);
    this.scaleGridCanvas.onmouseup = this.mouseUpHandler.bind(this);
    this.scaleGridCanvas.onmouseleave = this.mouseLeaveHandler.bind(this);
    this.scaleGridCanvas.onmouseenter = this.mouseEnterHandler.bind(this);
    console.log('this.mouseEnterHandler: ', this.mouseEnterHandler);
    console.log('this.scaleGridCanvas: ', this.scaleGridCanvas);
    console.log('this: ', this);
  }
  mouseLeaveHandler(event) {
    this.mouseDown = false;
    event.target.classList.remove('modal-content-grid-canvas-grab');
  }
  mouseEnterHandler(event) {
    console.log('mouseEnterHandler');
    event.target.classList.add('modal-content-grid-canvas-grab');
  }
  mouseUpHandler(event) {
    this.mouseDown = false;
    event.target.classList.remove('modal-content-grid-canvas-grabbing');
    event.target.classList.add('modal-content-grid-canvas-grab');
    this.lastOffsetValueX = this.offsetValueX;
    this.lastOffsetValueY = this.offsetValueY;
    
    this.setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, lastOffsetValueX: this.lastOffsetValueX, lastOffsetValueY: this.lastOffsetValueY });
    })
  }
  mouseDownHandler(event) {
    this.mouseDown = true;
    event.target.classList.remove('modal-content-grid-canvas-grab');
    event.target.classList.add('modal-content-grid-canvas-grabbing');
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
  updateGalleryImg(newgalleryImg) {
    this.galleryImg = newgalleryImg;
    this.updatePreferences()
  }
  updatePreferences() {
    this.pr = this.ctx.canvas.height * 100 / this.img.height;
    this.zoom = +this.galleryImg.getZoom() / 100;
    this.imgWidth = (this.img.width / 100 * this.pr) * this.zoom;
    this.imgHeight = (this.img.height / 100 * this.pr) * this.zoom;
    this.imgOffsetX = (this.ctx.canvas.width - this.imgWidth) / 2;
    this.imgOffsetY = (this.ctx.canvas.height - this.imgHeight) / 2;
    this.offsetValueX = 0;
    this.offsetValueY = 0;
    this.lastOffsetValueX = this.galleryImg.getLastOffsetValueX();
    this.lastOffsetValueY = this.galleryImg.getLastOffsetValueY();
  }
}