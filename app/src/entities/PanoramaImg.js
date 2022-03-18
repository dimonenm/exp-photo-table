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
  async loadImgStreamForData(url) {
    const blob = await fetch(url).then(r => this.data = r.blob());
    this.setData(blob);
  }
}