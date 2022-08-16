import drawArrowArray from '../services/forModalCanvas/fDrawArrowArray';

export default class PhotoTableImg {
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
      case 'horizontal':
        this.setTransformation(454, 340);
        break;
      case 'vertical':
        this.setTransformation(340, 454);
        break;
      case '9X6':
        this.setTransformation(340, 227);
        break;
      case '6X9':
        this.setTransformation(227, 340);
        break;
      default:
        break;
    }
  }

  async loadImgData(gallaryImage) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const gallaryImageZoom = +gallaryImage.getZoom();
    const gallaryImageArrowsArray = gallaryImage.getArrowsArray();
    const gallaryImageArrowsColor = gallaryImage.getArrowsColor();
    const gallaryImageArrowsWidth = gallaryImage.getArrowsWidth();
    const setData = this.setData.bind(this);

    switch (gallaryImage.orientation) {
      case 'panorama':
        ctx.canvas.height = 460;
        ctx.canvas.width = 747;
        break;
      case 'horizontal':
        ctx.canvas.height = 525;
        ctx.canvas.width = 700;
        break;
      case 'vertical':
        ctx.canvas.height = 632;
        ctx.canvas.width = 474;
        break;
      case '9X6':
        ctx.canvas.height = 350;
        ctx.canvas.width = 525;
        break;
      case '6X9':
        ctx.canvas.height = 525;
        ctx.canvas.width = 340;
        break;
      default:
        break;
    }

    await new Promise((onSuccess, onError) => {
      img.addEventListener('load', function () {

        const zoom = gallaryImageZoom / 100;
        const imgW = this.width * zoom;
        const imgH = this.height * zoom;

        ctx.drawImage(img, 0, 0, imgW, imgH);

        if (gallaryImageArrowsArray.length > 0) {
          for (const item of gallaryImageArrowsArray) {
            drawArrowArray(ctx, item.getNumber(), gallaryImageArrowsColor, gallaryImageArrowsWidth, item.x1, item.y1, item.x2, item.y2);
          }
        }
        onSuccess();
      })

      img.src = gallaryImage.getUrl();
    });

    await new Promise((onSuccess, onError) => {
      setData(canvas.toDataURL('image/jpeg', 1));
      onSuccess();
    });
  }
}