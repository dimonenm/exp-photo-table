import { Paragraph, Header, Footer, TextRun, ImageRun, AlignmentType, PageNumber } from "docx";
import PhotoTableImg from "./PhotoTableImg";

export default class PhotoPage {

  constructor(galleryImages, photoTableData) {
    this.FONT = "Times New Roman";
    this.CENTER = AlignmentType.CENTER;
    this.JUSTIFIED = AlignmentType.JUSTIFIED;
    // this.CANVAS_HEIGHT = 460;
    this.galleryImages = galleryImages;
    this.photoTableData = photoTableData;

    this.properties = {
      page: {
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
      }
    };
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
    this.children = [];
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
    };
  }

  // функции доступа к полям
  getChildren() {
    return this.children;
  }
  // функции изменения полей
  setChildren(value) {
    this.children = value;
  }
  setProperties(uneven) {
    uneven ? 
      this.properties = {
        page: {
          margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
        }
      } :
      this.properties = {
        page: {
          margin: { top: '1cm', right: '4cm', bottom: '1cm', left: '1cm' }
        }
      }
  }
  // служебные функции
  async addFirstImg(imgIndex) {
    const photoTableImg = new PhotoTableImg();
    photoTableImg.findWidthAndHeight(this.galleryImages[imgIndex].orientation);
    await photoTableImg.loadImgData(this.galleryImages[imgIndex]);

    const paragraphImg = new Paragraph(
      {
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            font: this.FONT,
            size: 24,
            break: 1,
          }),
          new ImageRun({ data: photoTableImg.getData(), transformation: photoTableImg.getTransformation() })
        ]
      }
    );

    const paragraphDesc = new Paragraph(
      {
        alignment: AlignmentType.JUSTIFIED,
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

  async addSecondImg(imgIndex) {
    const photoTableImg = new PhotoTableImg();
    photoTableImg.findWidthAndHeight(this.galleryImages[imgIndex].orientation);
    await photoTableImg.loadImgData(this.galleryImages[imgIndex]);

    const paragraphImg = new Paragraph(
      {
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            font: this.FONT,
            size: 24,
            break: 1,
          }),
          new ImageRun({ data: photoTableImg.getData(), transformation: photoTableImg.getTransformation() })
        ]
      }
    );

    const paragraphDesc = new Paragraph(
      {
        alignment: AlignmentType.JUSTIFIED,
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

  descAddedArrows(imgIndex) {
    if (this.galleryImages[imgIndex].arrowsArray.length > 0) {
      let str = ''

      for (const item of this.galleryImages[imgIndex].arrowsArray) {
        if (str) {
          str += `, ${item.number}. ${item.text}`;
        }
        if (!str) {
          str += `${item.number}. ${item.text}`;
        }
      }
      // console.log('this.galleryImages[0]: ', this.galleryImages[0].arrowsArray);
      return new TextRun({
        text: ` (${str}).`,
        // font: "Times New Roman",
        // size: 26,
      })
    }
  }
}