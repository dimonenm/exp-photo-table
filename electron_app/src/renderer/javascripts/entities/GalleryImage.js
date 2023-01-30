export default class GallaryImage {
  constructor() {
    this.index = 0;
    this.name = '';
    this.url = '';
    this.data = '';
    this.orientation = 'horizontal';
    this.imgDesc = '';
    this.imgCuted = false;
    this.lastOffsetValueX = 0;
    this.lastOffsetValueY = 0;
    this.zoom = '100';
    this.arrowsColor = '#ffffff';
    this.arrowsWidth = '2';
    this.arrowsArray = [];
    this.contrast = '100';
    this.brightness = '100';
    this.saturate = '100';
    this.rotationDegrees = '0';
  }

  // функции доступа к полям
  getIndex() {
    return this.index;
  }
  getName() {
    return this.name;
  }
  getUrl() {
    return this.url;
  }
  getData() {
    return this.data;
  }
  getOrientation() {
    return this.orientation;
  }
  getImgDesc() {
    return this.imgDesc;
  }
  getImgCuted() {
    return this.imgCuted;
  }
  getLastOffsetValueX() {
    return this.lastOffsetValueX;
  }
  getLastOffsetValueY() {
    return this.lastOffsetValueY;
  }
  getZoom() {
    return this.zoom;
  }
  getArrowsColor() {
    return this.arrowsColor;
  }
  getArrowsWidth() {
    return this.arrowsWidth;
  }
  getArrowsArray() {
    return this.arrowsArray;
  }
  getContrast() {
    return this.contrast;
  }
  getBrightness() {
    return this.brightness;
  }
  getSaturate() {
    return this.saturate;
  }
  getRotationDegrees() {
    return this.rotationDegrees;
  }
  // функции изменения полей
  setIndex(value) {
    this.index = value;
  }
  setName(value) {
    this.name = value;
  }
  setUrl(value) {
    this.url = value;
  }
  setData(value) {
    this.data = value;
  }
  setOrientation(value) {
    this.orientation = value;
  }
  setImgDesc(value) {
    this.imgDesc = value;
  }
  setImgCuted(value) {
    this.imgCuted = value;
  }
  setLastOffsetValueX(value) {
    this.lastOffsetValueX = value;
  }
  setLastOffsetValueY(value) {
    this.lastOffsetValueY = value;
  }
  setArrowsColor(value) {
    this.arrowsColor = value;
  }
  setArrowsWidth(value) {
    this.arrowsWidth = value;
  }
  setArrowsArray(value) {
    this.arrowsArray = value;
  }
  setContrast(value) {
    this.contrast = value
  }
  setBrightness(value) {
    this.brightness = value
  }
  setSaturate(value) {
    this.saturate = value
  }
  setRotationDegrees(value) {
    this.rotationDegrees = value
  }
}