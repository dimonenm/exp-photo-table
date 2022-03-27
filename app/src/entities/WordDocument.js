// import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { Document, Packer } from "docx";
import { saveAs } from "file-saver";
import TitlePage from "./TitlePage";
export default class WordDocument{
  constructor(galleryImages, photoTableData) {
    this.title = '';
    this.sections = [];
    this.galleryImages = galleryImages;
    this.photoTableData = photoTableData;

    this.testOn = true;
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
  async addTitlePage() {
    const titlePage = new TitlePage(this.galleryImages, this.photoTableData);
    console.log('addTitlePage: 1');
    await titlePage.addPanoramaImg();
    console.log('addTitlePage: 2');
    const sections = this.getSections();
    sections.push(titlePage);
    this.setSections(sections);
  }

  saveDocument() {
    this.setTitle(`${this.testOn ? "123" : this.photoTableData.numbOMP} - ${this.photoTableData.unit} - КУСП №${this.testOn ? "2564" : this.photoTableData.kusp} - ${this.photoTableData.executor}`);

    const doc = new Document({
      title: this.getTitle(),
      sections: this.getSections()
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${this.getTitle()}.docx`);
      console.log("Document created successfully");
    });
  }
}