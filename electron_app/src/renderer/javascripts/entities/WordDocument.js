import { Document, Packer, Paragraph, Header, Footer, TextRun, ImageRun, AlignmentType, PageNumber } from "docx";
import { saveAs } from "file-saver";
import TitlePage from "./TitlePage";
import PhotoPage from "./PhotoPage";
import PhotoTableImg from "./PhotoTableImg";
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

    class PhotoPageItem {
      // свойства документа
      FONT = "Times New Roman"
      CENTER = AlignmentType.CENTER
      JUSTIFIED = AlignmentType.JUSTIFIED
      INDENT_VERTICAL = { firstLine: 2024 }
      INDENT_HORIZONTAL = { firstLine: 1048 }
      official_status = null
      note = null
      properties = null
      headers = null
      children = []
      footers = null
      // служебные свойства 
      isFilled = false
      firstHalf = false
      secondHalf = false
      parity = false
      images = []
      firstHalfImages = []
      secondHalfImages = []
      constructor(galleryImages, photoTableData, settings) { 
        this.galleryImages = galleryImages;
        this.photoTableData = photoTableData;
        this.official_status = settings.official_status;
        this.note = settings.note;
        this.headers = {
          default: new Header({
            children: [
              new Paragraph({
                alignment: this.CENTER,
                children: [
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: this.FONT,
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        }
        this.footers = {
          default: new Footer({
            children: [
              new Paragraph(
                {
                  alignment: this.CENTER,
                  children: [
                    new TextRun({
                      text: `${this.OFFICIAL_STATUS} _______________ ${photoTableData.executor}`,
                      font: this.FONT,
                      size: 24,
                    })
                  ]
                }
              ),
            ],
          })
        }
      }
      getIsFilled() {
        return this.isFilled
      }
      getFirstHalf() {
        return this.firstHalf
      }
      getSecondHalf() {
        return this.secondHalf
      }
      getFirstHalfImages() {
        return this.firstHalfImages
      }
      getSecondHalfImages() {
        return this.secondHalfImages
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
      setFirstHalfImages(value) {
        this.firstHalfImages = value
      }
      setSecondHalfImages(value) {
        this.secondHalfImages = value
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
      pushFirstHalfImages(value) {
        this.firstHalfImages.push(value)
      }
      pushSecondHalfImages(value) {
        this.secondHalfImages.push(value)
      }
      async addFirstImg(imgIndex) {
        const photoTableImg = new PhotoTableImg();
        await photoTableImg.loadImgData(this.galleryImages[imgIndex]);

        const paragraphImg = new Paragraph(
          {
            alignment: this.CENTER,
            children: [
              new TextRun({
                font: this.FONT,
                size: 24,
                break: 1,
              }),
              new ImageRun({ data: photoTableImg.getData() })
            ]
          }
        );

        const paragraphDesc = new Paragraph(
          {
            alignment: this.JUSTIFIED,
            indent: this.galleryImages[imgIndex].orientation === 'horizontal' ? this.INDENT_HORIZONTAL : this.galleryImages[imgIndex].orientation === 'vertical' ? this.INDENT_VERTICAL : this.INDENT_PANORAMA,
            children: [
              new TextRun({
                text: `Фото №${this.galleryImages[imgIndex].index}. `,
                font: "Times New Roman",
                size: 26,
                bold: true,
              }),
              new TextRun({
                text: this.galleryImages[imgIndex].imgDesc,
                font: "Times New Roman",
                size: 26,
              }),
              this.descAddedArrows(imgIndex)
            ]
          }
        );

        const children = this.getChildren();

        children.push(paragraphImg);
        children.push(paragraphDesc);

        this.setChildren(children);
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

    const photoPages = [new PhotoPageItem(this.galleryImages, this.photoTableData, this.settings)]
    

    for (const img of this.galleryImages) {

      if (img.orientation !== "panorama") {
        const imgItem = new ImgItem(img.index, img.orientation)
        const lastPage = photoPages[photoPages.length - 1]

        if (lastPage.getIsFilled() === false) {
          if (lastPage.getFirstHalfImages().length === 0) {
            lastPage.pushFirstHalfImages(imgItem)
            if (imgItem.getOrientation() !== "6X9") lastPage.setFirstHalf(true)
          }
          else if (lastPage.getFirstHalfImages().length > 0 && lastPage.getFirstHalf() !== true) {
            if (imgItem.getOrientation() === "6X9") {
              lastPage.pushFirstHalfImages(imgItem)
              lastPage.setFirstHalf(true)
            }
            else if (imgItem.getOrientation() !== "6X9") {
              lastPage.setFirstHalf(true)
              lastPage.pushSecondHalfImages(imgItem)
              lastPage.setSecondHalf(true)
              lastPage.setIsFilled(true)
            }
          }
          else if (lastPage.getFirstHalf() && lastPage.getSecondHalfImages().length === 0) {
            lastPage.pushSecondHalfImages(imgItem)
            if (imgItem.getOrientation() !== "6X9") {
              lastPage.setSecondHalf(true)
              lastPage.setIsFilled(true)
            }
          }
          else if (lastPage.getFirstHalf() && lastPage.getSecondHalfImages().length > 0 && lastPage.getSecondHalf() !== true) {
            if (imgItem.getOrientation() === "6X9") {
              lastPage.pushSecondHalfImages(imgItem)
              lastPage.setSecondHalf(true)
              lastPage.setIsFilled(true)
            }
            else if (imgItem.getOrientation() !== "6X9") {
              lastPage.setSecondHalf(true)
              lastPage.setIsFilled(true)

              const photoPageItem = new PhotoPageItem()
              photoPageItem.pushFirstHalfImages(imgItem)
              photoPageItem.setFirstHalf(true)
              photoPages.push(photoPageItem)
            }
          }
        }
        else if (lastPage.getIsFilled() === true) {
          const photoPageItem = new PhotoPageItem(this.galleryImages, this.photoTableData, this.settings)
          if (imgItem.getOrientation() === "6X9") {
            photoPageItem.pushFirstHalfImages(imgItem)
          }
          else if (imgItem.getOrientation() !== "6X9") {
            photoPageItem.pushFirstHalfImages(imgItem)
            photoPageItem.setFirstHalf(true)
          }
          photoPages.push(photoPageItem)
        }
      }
    }
    for (const page of photoPages) {
      page.setParity(this.parityCheck)
      this.parityCheck = !this.parityCheck
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