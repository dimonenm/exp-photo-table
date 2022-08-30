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
    this.parityCheck = false;
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

    const photoPages = []

    class PhotoPageItem {
      isFilled = false
      firstHalf = false
      secondHalf = false
      parity = false
      images = []
      constructor() { }
      getIsFilled() {
        return this.isFilled
      }
      getFirstHalf() {
        return this.firstHalf
      }
      getSecondHalf() {
        return this.secondHalf
      }
      getParity() {
        return this.parity
      }
      getImages() {
        return this.images
      }
      setIsFilled(value) {
        this.isFilled = value
      }
      setFirstHalf(value) {
        this.firstHalf = value
      }
      setSecondHalf(value) {
        this.secondHalf = value
      }
      setParity(value) {
        this.parity = value
      }
      setImages(value) {
        this.images = value
      }
      pushImage(value) {
        this.images.push(value)
      }
    }
    class ImgItem {
      index = ''
      orientation = ''
      constructor(index, orientation) {
        this.index = index
        this.orientation = orientation
      }
      getIndex() {
        return this.index
      }
      getOrientation() {
        return this.orientation
      }
      setIndex(value) {
        this.index = value
      }
      setOrientation(value) {
        this.orientation = value
      }
    }

    for (const img of this.galleryImages) {
      if (!photoPages.length) {
        if (img.orientation !== "panorama") {
          const photoPageItem = new PhotoPageItem()
          const imgItem = new ImgItem(img.index, img.orientation)
          photoPageItem.pushImage(imgItem)
          if (imgItem.getOrientation() !== "6X9") photoPageItem.setFirstHalf(true)
          photoPageItem.setParity(this.parityCheck)
          this.parityCheck = !this.parityCheck
          photoPages.push(photoPageItem)
        }
      } else {
        if (img.orientation !== "panorama") {
          const imgItem = new ImgItem(img.index, img.orientation)
          if (photoPages[photoPages.length - 1].getIsFilled() === false)
          {
            if (//проверка на незаполненность первой половины и маленькую фотографию
              photoPages[photoPages.length - 1].getFirstHalf() === false
              && imgItem.getOrientation() === "6X9"
            )
            {
              photoPages[photoPages.length - 1].pushImage(imgItem)
              photoPages[photoPages.length - 1].setFirstHalf(true)
            }
            else if (//проверка на незаполненность первой половины и большую фотографию
              photoPages[photoPages.length - 1].getFirstHalf() === false
              && imgItem.getOrientation() !== "6X9"
            )
            {
              photoPages[photoPages.length - 1].pushImage(imgItem)
              photoPages[photoPages.length - 1].setFirstHalf(true)
              photoPages[photoPages.length - 1].setSecondHalf(true)
              photoPages[photoPages.length - 1].setIsFilled(true)
            }
            else if (//проверка на незаполненность второй половины, наличие фотографии второй половины и маленькую фотографию
              photoPages[photoPages.length - 1].getSecondHalf() === false
              && photoPages[photoPages.length - 1].getImages().length < 3
              && imgItem.getOrientation() === "6X9"
            )
            {
              photoPages[photoPages.length - 1].pushImage(imgItem)
            }
            else if (//проверка на незаполненность второй половины, маленькую фотографию второй половины и маленькую фотографию
              photoPages[photoPages.length - 1].getSecondHalf() === false
              && photoPages[photoPages.length - 1].getImages()[photoPages[photoPages.length - 1].getImages().length - 1].getOrientation() === "6X9"
              && imgItem.getOrientation() === "6X9"
            )
            {
              photoPages[photoPages.length - 1].pushImage(imgItem)
              photoPages[photoPages.length - 1].setSecondHalf(true)
              photoPages[photoPages.length - 1].setIsFilled(true)
            } else if (//проверка на незаполненность второй половины, наличие фотографии второй половины, большую фотографию второй половины и большую фотографию
              photoPages[photoPages.length - 1].getSecondHalf() === false
              && photoPages[photoPages.length - 1].getImages().length < 3
              && photoPages[photoPages.length - 1].getImages()[photoPages[photoPages.length - 1].getImages().length - 1].getOrientation() !== "6X9"
              && imgItem.getOrientation() !== "6X9")
            {
              photoPages[photoPages.length - 1].pushImage(imgItem)
              photoPages[photoPages.length - 1].setSecondHalf(true)
              photoPages[photoPages.length - 1].setIsFilled(true)
            }
          } else {
            if (img.orientation !== "panorama") {
              const photoPageItem = new PhotoPageItem()
              const imgItem = new ImgItem(img.index, img.orientation)
              photoPageItem.pushImage(imgItem)
              if (imgItem.getOrientation() !== "6X9") photoPageItem.setFirstHalf(true)
              photoPageItem.setParity(this.parityCheck)
              this.parityCheck = !this.parityCheck
              photoPages.push(photoPageItem)
            }
          }
        }
      }
    }
    console.log('photoPages: ', photoPages);

    let pagesCount = Math.ceil((this.galleryImages.length - 1) / 2); // в переменную вносится количесто страниц фототаблизы без титульной страницы

    for (let page = 1; page <= pagesCount; page++) {
      const photoPage = new PhotoPage(this.galleryImages, this.photoTableData, this.settings);

      photoPage.setParity(this.parityCheck); // устанавливается четность страницы фототаблицы
      this.parityCheck = !this.parityCheck

      await photoPage.addFirstImg(page * 2 - 1);

      if (this.galleryImages[page * 2])
        await photoPage.addSecondImg(page * 2);

      const sections = this.getSections();

      sections.push(photoPage);

      this.setSections(sections);
    }

    if (this.galleryImages.length % 2) {
      const photoPage = new PhotoPage(this.galleryImages, this.photoTableData, this.settings);
      photoPage.setParity(this.parityCheck);
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
    });
  }
}