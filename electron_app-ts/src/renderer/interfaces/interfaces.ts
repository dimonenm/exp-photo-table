export interface ICurrentGalleryImage {
  index: string,
  nameImg: string,
  urlImg: string,
  orientation: string
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
