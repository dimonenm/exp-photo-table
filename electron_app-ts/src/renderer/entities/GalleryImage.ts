import { IGallaryImage } from '../interfaces/interfaces'

export default class GallaryImage implements IGallaryImage {
  index;
  name;
  url;
  data;
  orientation;
  imgDesc;
  imgCuted: boolean;
  lastOffsetValueX;
  lastOffsetValueY;
  zoom;
  arrowsColor;
  arrowsWidth;
  arrowsArray: [];
  contrast;
  brightness;
  saturate;
  rotationDegrees;
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
  setIndex(value: number) {
    this.index = value;
  }
  setName(value: string) {
    this.name = value;
  }
  setUrl(value: string) {
    this.url = value;
  }
  setData(value: string) {
    this.data = value;
  }
  setOrientation(value: string) {
    this.orientation = value;
  }
  setImgDesc(value: string) {
    this.imgDesc = value;
  }
  setImgCuted(value: boolean) {
    this.imgCuted = value;
  }
  setLastOffsetValueX(value: number) {
    this.lastOffsetValueX = value;
  }
  setLastOffsetValueY(value: number) {
    this.lastOffsetValueY = value;
  }
  setZoom(value: string) {
    this.zoom = value;
  }

  setArrowsColor(value: string) {
    this.arrowsColor = value;
  }
  setArrowsWidth(value: string) {
    this.arrowsWidth = value;
  }
  setArrowsArray(value: []) {
    this.arrowsArray = value;
  }
  setContrast(value: string) {
    this.contrast = value
  }
  setBrightness(value: string) {
    this.brightness = value
  }
  setSaturate(value: string) {
    this.saturate = value
  }
  setRotationDegrees(value: string) {
    this.rotationDegrees = value
  }
}