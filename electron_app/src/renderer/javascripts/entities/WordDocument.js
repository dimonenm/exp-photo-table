// import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { Document, Packer } from "docx";
import { saveAs } from "file-saver";
import TitlePage from "./TitlePage";
import PhotoPage from "./PhotoPage";
export default class WordDocument {
  constructor(galleryImages, photoTableData, settings) {
    this.title = '';
    this.sections = [];
    this.galleryImages = galleryImages;
    this.photoTableData = photoTableData;
    this.settings = settings;
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
    const titlePage = new TitlePage(this.galleryImages, this.photoTableData, this.settings);

    await titlePage.addPanoramaImg();

    const sections = this.getSections();

    sections.push(titlePage);

    this.setSections(sections);
  }
  async addPhotoPages() {

    let pagesCount = Math.ceil((this.galleryImages.length - 1) / 2);

    for (let page = 1; page <= pagesCount; page++) {
      const photoPage = new PhotoPage(this.galleryImages, this.photoTableData, this.settings);

      photoPage.setProperties(page % 2);

      await photoPage.addFirstImg(page * 2 - 1);

      if (this.galleryImages[page * 2])
        await photoPage.addSecondImg(page * 2);

      const sections = this.getSections();

      sections.push(photoPage);

      this.setSections(sections);
    }

    if (this.galleryImages.length % 2) {
      const photoPage = new PhotoPage(this.galleryImages, this.photoTableData, this.settings);
      photoPage.setProperties((pagesCount + 1) % 2);
      photoPage.addSupplement();     
      
      const sections = this.getSections();
      
      sections.push(photoPage);
      
      this.setSections(sections);
    } else {
      const sections = this.getSections();
      const photoPage = sections.pop()
      photoPage.addSupplement();
      sections.push(photoPage);
      this.setSections(sections);
    }
  }

  saveDocument() {
    this.setTitle(`${this.photoTableData.numbOMP} - ${this.photoTableData.unit} - КУСП №${this.photoTableData.kusp} - ${this.photoTableData.executor}`);

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