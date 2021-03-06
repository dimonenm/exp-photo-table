import { Paragraph, Footer, TextRun, ImageRun, AlignmentType } from "docx";
import PanoramaImg from "./PanoramaImg";

export default class TitlePage {

  constructor(galleryImages, photoTableData, settings) {
    this.FONT = "Times New Roman";
    this.CENTER = AlignmentType.CENTER;
    this.JUSTIFIED = AlignmentType.JUSTIFIED;
    this.OFFICIAL_STATUS = settings.official_status;
    this.ZIP_CODE = settings.zip_code;
    this.ADDRESS = settings.address;
    this.TEL = settings.tel;
    this.galleryImages = galleryImages;
    this.photoTableData = photoTableData;

    this.properties = {
      page: {
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
      }
    };
    this.children = [
      new Paragraph(
        {
          alignment: this.CENTER,
          children: [
            new TextRun({
              text: "МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ",
              bold: true,
              font: this.FONT,
              size: 28,
            })
          ]
        }
      ),
      new Paragraph(
        {
          alignment: this.CENTER,
          children: [
            new TextRun({
              text: "ПО РЕСПУБЛИКЕ КРЫМ",
              bold: true,
              font: this.FONT,
              size: 28,
            })
          ]
        }
      ),
      new Paragraph(
        {
          alignment: this.CENTER,
          children: [
            new TextRun({
              text: "ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР",
              bold: true,
              font: this.FONT,
              size: 28,
            })
          ]
        }
      ),
      new Paragraph(
        {
          alignment: this.JUSTIFIED,
          thematicBreak: true,
          children: [
            new TextRun({
              text: `${this.ZIP_CODE}, ${this.ADDRESS}`,
              bold: false,
              font: this.FONT,
              size: 24,
              break: 2,
            }),
            new TextRun({
              text: `                                   тел. ${this.TEL}`,
              bold: false,
              font: this.FONT,
              size: 24,
            })
          ]
        }
      ),
      new Paragraph(
        {
          alignment: this.CENTER,
          children: [
            new TextRun({
              text: "ФОТОТАБЛИЦА",
              bold: true,
              font: this.FONT,
              size: 36,
              break: 2,
            })
          ]
        }
      ),
      new Paragraph(
        {
          alignment: this.CENTER,
          children: [
            new TextRun({
              font: this.FONT,
              size: 24,
              break: 1,
            })
          ]
        }
      ),
      new Paragraph(
        {
          alignment: this.JUSTIFIED,
          indent: { firstLine: 721 },
          children: [
            new TextRun({
              text: `к протоколу осмотра места происшествия от ${this.testOn ? "2022-03-10" : photoTableData.dateForDoc} по факту ${this.testOn ? "кражи имущества" : photoTableData.factOMP} по адресу: ${this.testOn ? "г. Симферополь, ул. Балаклавская 68" : photoTableData.adressOMP}.`,
              font: this.FONT,
              size: 24,
            })
          ]
        }
      )
    ];
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
  // служебные функции
  async addPanoramaImg() {

    const panoramaImg = new PanoramaImg();
    panoramaImg.findWidthAndHeight(this.galleryImages[0].orientation);
    await panoramaImg.loadImgData(this.galleryImages[0]);    

    const paragraphImg = new Paragraph(
      {
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            font: this.FONT,
            size: 24,
            break: 1,
          }),
          new ImageRun({ data: panoramaImg.getData(), transformation: panoramaImg.getTransformation() })
        ]
      }
    );

    const paragraphDesc = new Paragraph(
      {
        alignment: AlignmentType.JUSTIFIED,
        children: [
          new TextRun({
            text: `Фото №${this.galleryImages[0].index}. `,
            font: "Times New Roman",
            size: 26,
            bold: true,
          }),
          new TextRun({
            text: this.galleryImages[0].imgDesc,
            font: "Times New Roman",
            size: 26,
          }),
          this.descAddedArrows()
        ]
      }
    );

    const children = this.getChildren();

    children.push(paragraphImg);
    children.push(paragraphDesc);

    this.setChildren(children);
  }
  
  descAddedArrows() {
    if (this.galleryImages[0].arrowsArray.length > 0) {
      let str = ''

      for (const item of this.galleryImages[0].arrowsArray) {
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