import drawArrowArray from '../services/forModalCanvas/fDrawArrowArray';
export default class PanoramaImg {

  constructor() {
    this.data = null;
    this.transformation = {
      width: null,
      height: null
    };
  }

  // функции доступа к полям
  getData() {
    return this.data;
  }
  getTransformation() {
    return this.transformation;
  }
  // функции изменения полей
  setData(value) {
    this.data = value;
  }
  setTransformation(w, h) {
    this.transformation = {
      width: w,
      height: h
    };
  }
  // служебные функции
  findWidthAndHeight(orientation) {
    switch (orientation) {
      case 'panorama':
        this.setTransformation(604, 340);
        break;
        case 'vertical':
        this.setTransformation(340, 454);
        break;
        case 'horizontal':
        this.setTransformation(454, 340);
        break;
      default:
        break;
    }
  }
  async loadImgStreamForData(gallaryImage) {
    const blob = await fetch(gallaryImage.url).then(r => this.data = r.blob());
    this.setData(blob);
  }
  async loadImgData(gallaryImage) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const gallaryImageZoom = +gallaryImage.getZoom();
    const gallaryImageLastOffsetValueX = gallaryImage.getLastOffsetValueX();
    const gallaryImageLastOffsetValueY = gallaryImage.getLastOffsetValueY();
    const gallaryImageArrowsArray = gallaryImage.getArrowsArray();
    const gallaryImageArrowsColor = gallaryImage.getArrowsColor();
    const gallaryImageArrowsWidth = gallaryImage.getArrowsWidth();
    const data = this.data;
    const setData = (da, x) => { da = x };
    // console.log(this);

    img.onload = function () {
      ctx.canvas.height = 460;
      const pr = ctx.canvas.height * 100 / this.height;

      const zoom = gallaryImageZoom / 100;
      const imgW = (this.width / 100 * pr) * zoom;
      const imgH = (this.height / 100 * pr) * zoom;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, ((ctx.canvas.width - imgW) / 2) + gallaryImageLastOffsetValueX, ((ctx.canvas.height - imgH) / 2) + gallaryImageLastOffsetValueY, imgW, imgH);

      if (gallaryImageArrowsArray.length > 0) {
        for (const item of gallaryImageArrowsArray) {
          drawArrowArray(ctx, item.getNumber(), gallaryImageArrowsColor, gallaryImageArrowsWidth, item.x1, item.y1, item.x2, item.y2);
        }
      }

      // setData(canvas.toDataURL());
      // console.log('canvas.toDataURL(): ', canvas.toDataURL());
      // console.log('getData(): ', this.getData());
      console.log('getData', data);
      console.log('setData', setData(data, 10));
      console.log('getData', data);
    }

    img.src = gallaryImage.getUrl();
  }
}