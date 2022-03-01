import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { saveAs } from "file-saver";
export default class WordDocument{
  constructor() {
    this.title = '';
    this.sections = [];
  }
  // функции доступа к полям
  getTitle() {
    return this.title;
  }
  getSections() {
    return this.sections;
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