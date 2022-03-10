import { Paragraph, Footer, TextRun, AlignmentType } from "docx";

export default class TitlePage {

  
  constructor(galleryImages, photoTableData) {

    this.FONT = "Times New Roman";
    this.CENTER = AlignmentType.CENTER;
    this.JUSTIFIED = AlignmentType.JUSTIFIED;
    this.OFFICIAL_STATUS = 'специалист';
    this.ZIP_CODE = '295006';
    this.ADDRESS = 'г. Симферополь, ул. Павленко, 1а';
    this.TEL = '(3652) 66-74-34';

    this.testOn = true;

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
      ),

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
}