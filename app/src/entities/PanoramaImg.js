export default class PanoramaImg {

  constructor(galleryImages) {
    this.data = null;
    this.width = null;
    this.height = null;
    this.transformation = {
      width: this.width,
      height: this.height
    };
    this.galleryImages = galleryImages;

    this.findWidthAndHeight();

    //   [
    //   new TextRun({
    //     font: "Times New Roman",
    //     size: 24,
    //     break: 1,
    //   }),
    //   new ImageRun({
    //     data: blob,
    //     transformation: galleryImages[j]?.orientation === 'vertical' ? {
    //       width: 340,
    //       height: 454,
    //     } : {
    //       width: 454,
    //       height: 340,
    //     },
    //   }),
    // ]
  }

  // функции доступа к полям
  getData() {
    return this.data;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  getTransformation() {
    return this.transformation;
  }
  // функции изменения полей
  setData(value) {
    this.data = value;
  }
  setWidth(value) {
    this.width = value;
  }
  setHeight(value) {
    this.height = value;
  }
  // служебные функции
  // defineWidthAndHeight() {
  findWidthAndHeight() {
    // console.log(this.galleryImages[0].orientation);
    switch (this.galleryImages[0].orientation) {
      case 'panorama':
        this.setWidth(600);
        this.setHeight(340);
        break;
      case 'vertical':
        this.setWidth(340);
        this.setHeight(454);
        break;
      case 'horizontal':
        this.setWidth(454);
        this.setHeight(340);
        break;

      default:
        break;
    }
  }
}