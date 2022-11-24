import Tool from "./Tool";
import GallaryImage from "../../../../entities/GalleryImage";

export default class Hand extends Tool {
  constructor(canvas, galleryImg, setGalleryImg, isZoomScaleGrid) {
    super(canvas);
    this.img = new Image();
    this.galleryImg = galleryImg;
    this.setGalleryImg = setGalleryImg;
    this.arrowsArr = [...galleryImg.getArrowsArray()];
    this.isZoomScaleGrid = isZoomScaleGrid;
    this.listen();
    
    this.img.onload = () => {
      console.log('canvas height in Hand: ', canvas.height);
      this.pr = canvas.height * 100 / this.img.height;
      this.zoom = +this.galleryImg.getZoom() / 100;
      this.imgWidth = (this.img.width / 100 * this.pr) * this.zoom;
      this.imgHeight = (this.img.height / 100 * this.pr) * this.zoom;
      this.imgOffsetX = (canvas.width - this.imgWidth) / 2;
      this.imgOffsetY = (canvas.height - this.imgHeight) / 2;
      this.offsetValueX = 0;
      this.offsetValueY = 0;
      this.lastOffsetValueX = this.galleryImg.getLastOffsetValueX();
      this.lastOffsetValueY = this.galleryImg.getLastOffsetValueY();
    }
    
    this.img.src = galleryImg.getUrl();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this);
    this.canvas.onmouseenter = this.mouseEnterHandler.bind(this);
  }
  mouseLeaveHandler(event) {
    this.mouseDown = false;
    event.target.classList.remove('modal-content-grid-canvas-grab');
  }
  mouseEnterHandler(event) {
    event.target.classList.add('modal-content-grid-canvas-grab');
  }
  mouseUpHandler(event) {
    this.mouseDown = false;
    event.target.classList.remove('modal-content-grid-canvas-grabbing');
    event.target.classList.add('modal-content-grid-canvas-grab');
    this.lastOffsetValueX = this.offsetValueX;
    this.lastOffsetValueY = this.offsetValueY;
    if (this.arrowsArr.length > 0) {

      for (const item of this.arrowsArr) {
        item.offsetX = this.imgOffsetX + this.offsetValueX;
        item.offsetY = this.imgOffsetY + this.offsetValueY;
      }
    }
    this.setGalleryImg((prev) => {
      return Object.assign(new GallaryImage(), { ...prev, arrowsArray: this.arrowsArr, lastOffsetValueX: this.lastOffsetValueX, lastOffsetValueY: this.lastOffsetValueY });
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
      if (this.isZoomScaleGrid) {
        this.drawScaleGrid(this.ctx, this.galleryImg.getOrientation())
      }
    }
  }

  drawScaleGrid(ctx, orientation) {
    if (orientation === 'horizontal') {
      const linesHorizontal = 15
      const linesVertical = 10
      const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
      const gridPitchVertical = ctx.canvas.height / linesVertical
      let counterHorizontal = gridPitchHorizontal
      let counterVertical = gridPitchVertical
      for (let i = 0; i < (linesHorizontal - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(counterHorizontal, 0);
        ctx.lineTo(counterHorizontal, ctx.canvas.height);

        ctx.stroke();

        counterHorizontal = counterHorizontal + gridPitchHorizontal
      }
      for (let i = 0; i < (linesVertical - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(0, counterVertical);
        ctx.lineTo(ctx.canvas.width, counterVertical);

        ctx.stroke();

        counterVertical = counterVertical + gridPitchVertical
      }
    }
    if (orientation === 'vertical') {
      const linesHorizontal = 9
      const linesVertical = 12
      const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
      const gridPitchVertical = ctx.canvas.height / linesVertical
      let counterHorizontal = gridPitchHorizontal
      let counterVertical = gridPitchVertical
      for (let i = 0; i < (linesHorizontal - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(counterHorizontal, 0);
        ctx.lineTo(counterHorizontal, ctx.canvas.height);

        ctx.stroke();

        counterHorizontal = counterHorizontal + gridPitchHorizontal
      }
      for (let i = 0; i < (linesVertical - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(0, counterVertical);
        ctx.lineTo(ctx.canvas.width, counterVertical);

        ctx.stroke();

        counterVertical = counterVertical + gridPitchVertical
      }
    }
    if (orientation === '9X6') {
      const linesHorizontal = 9
      const linesVertical = 6
      const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
      const gridPitchVertical = ctx.canvas.height / linesVertical
      let counterHorizontal = gridPitchHorizontal
      let counterVertical = gridPitchVertical
      for (let i = 0; i < (linesHorizontal - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(counterHorizontal, 0);
        ctx.lineTo(counterHorizontal, ctx.canvas.height);

        ctx.stroke();

        counterHorizontal = counterHorizontal + gridPitchHorizontal
      }
      for (let i = 0; i < (linesVertical - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(0, counterVertical);
        ctx.lineTo(ctx.canvas.width, counterVertical);

        ctx.stroke();

        counterVertical = counterVertical + gridPitchVertical
      }
    }
    if (orientation === '6X9') {
      const linesHorizontal = 6
      const linesVertical = 9
      const gridPitchHorizontal = ctx.canvas.width / linesHorizontal
      const gridPitchVertical = ctx.canvas.height / linesVertical
      let counterHorizontal = gridPitchHorizontal
      let counterVertical = gridPitchVertical
      for (let i = 0; i < (linesHorizontal - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(counterHorizontal, 0);
        ctx.lineTo(counterHorizontal, ctx.canvas.height);

        ctx.stroke();

        counterHorizontal = counterHorizontal + gridPitchHorizontal
      }
      for (let i = 0; i < (linesVertical - 1); i++) {
        ctx.beginPath();

        ctx.moveTo(0, counterVertical);
        ctx.lineTo(ctx.canvas.width, counterVertical);

        ctx.stroke();

        counterVertical = counterVertical + gridPitchVertical
      }
    }
  }
}