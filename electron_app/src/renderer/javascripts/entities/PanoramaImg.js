import drawArrowArray from '../services/forModalCanvas/fDrawArrowArray';

export default class PanoramaImg {
  
  constructor() {
    this.documentSize = {
      width: 0,
      height: 0
    }
    this.data = null;
    this.transformation = {
      width: 0,
      height: 0
    };
  }

  // функции доступа к полям
  getDocumentWidth() {
    return this.documentSize.width;
  }
  getDocumentHeight() {
    return this.documentSize.height;
  }
  getData() {
    return this.data;
  }
  getTransformation() {
    return this.transformation;
  }
  // функции изменения полей
  setDocumentSize(valueWidth, valueHeight) {
    this.documentSize = {
      width: valueWidth,
      height: valueHeight
    };
  }
  setData(value) {
    this.data = value;
  }
  setTransformation(valueWidth, valueHeight) {
    this.transformation = {
      width: valueWidth,
      height: valueHeight
    };
  }

  // служебные функции
  async loadImgData(gallaryImage) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const gallaryImageZoom = +gallaryImage.getZoom();
    const gallaryImageArrowsArray = gallaryImage.getArrowsArray();
    const gallaryImageArrowsColor = gallaryImage.getArrowsColor();
    const gallaryImageArrowsWidth = gallaryImage.getArrowsWidth();

    const getDocumentWidth = this.getDocumentWidth.bind(this);
    const getDocumentHeight = this.getDocumentHeight.bind(this);
    const setDocumentSize = this.setDocumentSize.bind(this);
    const setData = this.setData.bind(this);
    const setTransformation = this.setTransformation.bind(this);

    switch (gallaryImage.getOrientation()) {
      case 'panorama':
        setDocumentSize(605, 0)
        break;
      case 'horizontal':
        setDocumentSize(567, 378)
        break;
      case 'vertical':
        setDocumentSize(340, 452)
        break;
      case '9X6':
        setDocumentSize(340, 227)
        break;
      case '6X9':
        setDocumentSize(227, 340)
        break;
      default:
        break;
    }

    await new Promise((onSuccess, onError) => {
      img.addEventListener('load', function () {
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;
        
        if (gallaryImage.getOrientation() === 'panorama') {
          setTransformation(getDocumentWidth(), (getDocumentWidth() / this.width) * this.height)
        } else {
          setTransformation(getDocumentWidth(), getDocumentHeight())
        }

        const zoom = gallaryImageZoom / 100;
        const imgW = this.width * zoom;
        const imgH = this.height * zoom;
        
        ctx.drawImage(img, 0, 0, imgW, imgH);

        if (gallaryImageArrowsArray.length > 0) {
          for (const item of gallaryImageArrowsArray) {
            drawArrowArray(ctx, item.getNumber(), gallaryImageArrowsColor, gallaryImageArrowsWidth, item.x1, item.y1, item.x2, item.y2);
          }
        }
        onSuccess('done');
      })
      img.src = gallaryImage.getUrl();      
    });
    
    await new Promise((onSuccess, onError) => {
      setData(canvas.toDataURL('image/jpeg', 1));
      onSuccess();
    });    
  }  
}