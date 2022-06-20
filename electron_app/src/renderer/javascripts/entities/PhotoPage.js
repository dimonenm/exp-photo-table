import { Paragraph, Header, Footer, TextRun, ImageRun, AlignmentType, PageNumber } from "docx";
import PhotoTableImg from "./PhotoTableImg";

export default class PhotoPage {

  constructor(galleryImages, photoTableData, settings) {
    this.FONT = "Times New Roman";
    this.CENTER = AlignmentType.CENTER;
    this.JUSTIFIED = AlignmentType.JUSTIFIED;
    this.OFFICIAL_STATUS = settings.official_status;
    this.NOTE = settings.note;
    this.INDENT_VERTICAL = { firstLine: 2024 };
    this.INDENT_HORIZONTAL = { firstLine: 1048 };
    this.INDENT_PANORAMA = { firstLine: 0 };
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
        alignment: this.CENTER,
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

  async addSecondImg(imgIndex) {
    const photoTableImg = new PhotoTableImg();
    photoTableImg.findWidthAndHeight(this.galleryImages[imgIndex].orientation);
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
          new ImageRun({ data: photoTableImg.getData(), transformation: photoTableImg.getTransformation() })
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

  addSupplement() {

    const paragraphSupplement = new Paragraph(
      {
        alignment: this.JUSTIFIED,
        children: [
          new TextRun({
            font: this.FONT,
            size: 24,
            break: 1,
          }),
          new TextRun({
            text: `${this.NOTE}`,
            bold: false,
            font: this.FONT,
            size: 24,
          })
        ]
      })

    const children = this.getChildren();

    children.push(paragraphSupplement);

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
      return new TextRun({
        text: ` (${str}).`
      })
    }
  }
}