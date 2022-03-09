// import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import TitlePage from "./TitlePage";
export default class WordDocument{
  constructor(galleryImages, photoTableData) {
    this.title = '';
    this.sections = [];
    this.galleryImages = galleryImages;
    this.photoTableData = photoTableData;

    this.titlePage = new TitlePage(galleryImages, photoTableData)
  }
  // функции доступа к полям
  getTitle() {
    return this.title;
  }
  getSections() {
    return this.sections;
  }
  getGalleryImages() {
    return this.galleryImages;
  }
  getPhotoTableData() {
    return this.photoTableData;
  }
  // функции изменения полей
  setTitle(value) {
    this.title = value;
  }
  setSections(value) {
    this.sections = value;
  }
  // служебные функции
  saveDocument(value, fileName) {
    Packer.toBlob(value).then(blob => {
      saveAs(blob, fileName);
      console.log("Document created successfully");
    });
  }
}