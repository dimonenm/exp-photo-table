export default class GallaryImage {
  constructor() {
    this.index = 0;
    this.name = '';
    this.text = '';
    this.url = '';
    this.orientation = 'horizontal';
    this.img = '';
    this.imgDesc = '';
    this.imgCuted = false;
    this.lastOffsetValueX = 0;
    this.lastOffsetValueY = 0;
    this.zoom = '100';
    this.arrowsColor = '#ffffff';
    this.arrowsWidth = '2';
    this.arrowsArray = [];
  }

  getIndex() {
    return this.index;
  }
  getName() {
    return this.name;
  }
  getText() {
    return this.text;
  }
  getUrl() {
    return this.url;
  }
  getOrientation() {
    return this.orientation;
  }
  getImg() {
    return this.img;
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

  setIndex(value) {
    this.index = value;
  }
  setName(value) {
    this.name = value;
  }
  setText(value) {
    this.text = value;
  }
  setUrl(value) {
    this.url = value;
  }
  setOrientation(value) {
    this.orientation = value;
  }
  setImg(value) {
    this.img = value;
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
  setZoom(value) {
    this.zoom = value;
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
}