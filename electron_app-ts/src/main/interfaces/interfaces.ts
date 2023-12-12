export interface ISendImgsData {
  name: string
  buffer: Buffer
  data: string
}
export interface IAutoSaveSettings {
  date: string;
  imagesNames: string[];
  imagesUrls: string[];
}