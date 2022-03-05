import { Paragraph, Footer, TextRun, AlignmentType } from "docx";

export default class TitlePage {

  
  constructor() {
    this.FONT = "Times New Roman";

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
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  // text: `${officialStatus} _______________ ${officialName}`,
                  font: this.FONT,
                  size: 24,
                })
              ]
            }
          ),
        ],
      })
    };
    this.children = [];
  }

  
}