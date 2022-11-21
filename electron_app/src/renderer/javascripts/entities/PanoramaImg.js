import drawArrowArray from '../services/forModalCanvas/fDrawArrowArray';
export default class PanoramaImg {
  
  constructor() {
    this.documentWidth = 605
    this.data = null;
    this.transformation = {
      width: 0,
      height: 0
    };
  }

  // функции доступа к полям
  getDocumentWidth() {
    return this.documentWidth;
  }
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
    const setData = this.setData.bind(this);
    const setTransformation = this.setTransformation.bind(this);

    if (gallaryImage.getOrientation() === 'panorama') {
      await new Promise((onSuccess, onError) => {
        img.addEventListener('load', function () {
          ctx.canvas.width = this.width;
          ctx.canvas.height = this.height;
          setTransformation(getDocumentWidth(), (getDocumentWidth() / this.width) * this.height)
  
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
    }
    
    await new Promise((onSuccess, onError) => {
      setData(canvas.toDataURL('image/jpeg', 1));
      onSuccess();
    });    
  }  
}