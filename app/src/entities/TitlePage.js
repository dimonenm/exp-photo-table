import { Paragraph, Footer, TextRun, AlignmentType } from "docx";

export default class TitlePage {

  
  constructor(galleryImages, photoTableData) {

    this.FONT = "Times New Roman";
    this.CENTER = AlignmentType.CENTER;
    this.JUSTIFIED = AlignmentType.JUSTIFIED;
    this.OFFICIAL_STATUS = 'специалист';
    this.ZIP_CODE = '295006';

    this.properties = {
      page: {
        margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
      }
    };
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
              text: `${this.ZIP_CODE}, г. Симферополь, ул. Павленко, 1а`,
              bold: false,
              font: "Times New Roman",
              size: 24,
              break: 2,
            }),
            new TextRun({
              text: "                                   тел. (3652) 66-74-34",
              bold: false,
              font: "Times New Roman",
              size: 24,
            })
          ]
        }
      ),



    ];
  }

  
}