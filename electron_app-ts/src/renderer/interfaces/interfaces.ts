export interface ICurrentGalleryImage {
  index: string,
  nameImg: string,
  urlImg: string,
  orientation: string
}
export interface IDownloadedImages {
  name: string,
  buffer: Uint8Array
}
export interface IProcessedImagesMin {
  name: string,
  url: string
}
export interface IGallaryImage {
  index: number;
  name: string;
  url: string;
  data: string;
  orientation: string;
  imgDesc: string;
  imgCuted: boolean;
  lastOffsetValueX: number;
  lastOffsetValueY: number;
  zoom: string;
  arrowsColor: string;
  arrowsWidth: string;
  arrowsArray: [];
  contrast: string;
  brightness: string;
  saturate: string;
  rotationDegrees: string;

  // функции доступа к полям
  getIndex?(): number,
  getName?(): string,
  getUrl?(): string,
  getData?(): string,
  getOrientation?(): string,
  getImgDesc?(): string,
  getImgCuted?(): boolean,
  getLastOffsetValueX?(): number,
  getLastOffsetValueY?(): number,
  getZoom?(): string,
  getArrowsColor?(): string,
  getArrowsWidth?(): string,
  getArrowsArray?(): [],
  getContrast?(): string,
  getBrightness?(): string,
  getSaturate?(): string,
  getRotationDegrees?(): string,
  // функции изменения полей
  setIndex?(value: number): void,
  setName?(value: string): void,
  setUrl?(value: string): void,
  setData?(value: string): void,
  setOrientation?(value: string): void,
  setImgDesc?(value: string): void,
  setImgCuted?(value: boolean): void,
  setLastOffsetValueX?(value: number): void,
  setLastOffsetValueY?(value: number): void,
  setZoom?(value: string): void,
  setArrowsColor?(value: string): void,
  setArrowsWidth?(value: string): void,
  setArrowsArray?(value: []): void,
  setContrast?(value: string): void,
  setBrightness?(value: string): void,
  setSaturate?(value: string): void,
  setRotationDegrees?(value: string): void,
}
export interface IModalProperties {
  isOpen: boolean,
  type: string,
  nameImg: string,
  urlImg: string,
  textImg: string,
  indexImgInGallery: string,
  cut: boolean
}
export interface IPhotoTableData {
  numbOMP: string,
  factOMP: string,
  adressOMP: string,
  dateOMP: string,
  dateForDoc: string,
  unit: string,
  kusp: string,
  executor: string
}
export interface IPreviewPageScale {
  transform: string,
  margin: string
}
export interface ISettings {
  address: string,
  executors: string[],
  note: string,
  official_status: string,
  tel: string,
  unit: string,
  zip_code: string,
}
export interface IWorkPlaceStyle {
  zoom: string
}
