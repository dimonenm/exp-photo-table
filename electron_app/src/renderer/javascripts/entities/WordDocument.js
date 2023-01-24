import { Document, Packer, Paragraph, Header, Footer, TextRun, ImageRun, AlignmentType, PageNumber, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import drawArrowArray from '../services/forModalCanvas/fDrawArrowArray';

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
  getSettings() {
    return this.settings;
  }
  // функции изменения полей
  setTitle(value) {
    this.title = value;
  }
  setSections(value) {
    this.sections = value;
  }
  pushSections(value) {
    this.sections.push(value);
  }
  // служебные функции
  async addPages() {
    class PhotoPage {
      // свойства документа
      FONT = "Times New Roman"
      CENTER = AlignmentType.CENTER
      JUSTIFIED = AlignmentType.JUSTIFIED
      INDENT_PANORAMA = { firstLine: 0 };
      INDENT_HORIZONTAL = { firstLine: 1133 }
      INDENT_VERTICAL = { firstLine: 1984 }
      INDENT_9x6 = { firstLine: 1984 }
      INDENT_6x9_1 = { firstLine: 2833 }
      INDENT_6x9_2 = { firstLine: 453.2 }
      BORDERS = {
        top: {
          style: BorderStyle.NONE,
          size: 0,
          color: "000000",
        },
        bottom: {
          style: BorderStyle.NONE,
          size: 0,
          color: "000000",
        },
        left: {
          style: BorderStyle.NONE,
          size: 0,
          color: "000000",
        },
        right: {
          style: BorderStyle.NONE,
          size: 0,
          color: "000000",
        },
      }

      zip_code = null
      address = null
      tel = null
      official_status = null
      note = null

      properties = {}
      headers = {}
      children = []
      footers = {}

      galleryImages
      photoTableData

      type
      parity

      constructor(galleryImages, photoTableData, settings) {
        this.zip_code = settings.zip_code;
        this.address = settings.address;
        this.tel = settings.tel;
        this.official_status = settings.official_status;
        this.note = settings.note;

        this.galleryImages = galleryImages;
        this.photoTableData = photoTableData;

        this.footers = {
          default: new Footer({
            children: [
              new Paragraph(
                {
                  alignment: this.CENTER,
                  children: [
                    new TextRun({
                      text: `${settings.official_status} _______________ ${photoTableData.executor}`,
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

      setType(value) {
        const localThis = this

        if (value === 'title') {
          this.children.push(ParagraphH2("МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ"))
          this.children.push(ParagraphH2("ПО РЕСПУБЛИКЕ КРЫМ"))
          this.children.push(ParagraphH2("ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР"))
          this.children.push(ParagraphAddress(this.zip_code, this.address, this.tel))
          this.children.push(ParagraphH1("ФОТОТАБЛИЦА"))
          this.children.push(ParagraphEmptyString(1))
          this.children.push(ParagraphDesc(this.photoTableData))
        }
        function ParagraphH1(text) {
          return new Paragraph(
            {
              alignment: localThis.CENTER,
              children: [
                new TextRun({
                  text: text,
                  bold: true,
                  font: localThis.FONT,
                  size: 36,
                  break: 2,
                })
              ]
            }
          )
        }
        function ParagraphEmptyString(value) {
          return new Paragraph(
            {
              alignment: localThis.CENTER,
              children: [
                new TextRun({
                  font: localThis.FONT,
                  size: 24,
                  break: value,
                })
              ]
            }
          )
        }
        function ParagraphH2(text) {
          return new Paragraph(
            {
              alignment: localThis.CENTER,
              children: [
                new TextRun({
                  text: text,
                  bold: true,
                  font: localThis.FONT,
                  size: 28,
                })
              ]
            }
          )
        }
        function ParagraphAddress(zip_code, address, tel) {
          return new Paragraph(
            {
              alignment: localThis.JUSTIFIED,
              thematicBreak: true,
              children: [
                new TextRun({
                  text: `${zip_code}, ${address}`,
                  bold: false,
                  font: localThis.FONT,
                  size: 24,
                  break: 2,
                }),
                new TextRun({
                  text: `                                   тел. ${tel}`,
                  bold: false,
                  font: localThis.FONT,
                  size: 24,
                })
              ]
            }
          )
        }
        function ParagraphDesc(photoTableData) {
          return new Paragraph(
            {
              alignment: localThis.JUSTIFIED,
              indent: { firstLine: 721 },
              children: [
                new TextRun({
                  text: `к протоколу осмотра места происшествия от ${photoTableData.dateForDoc} по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}.`,
                  font: localThis.FONT,
                  size: 24,
                })
              ]
            }
          )
        }
      }
      setParity(value) {
        if (value === 'odd') {
          this.properties = {
            page: {
              margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
            }
          }
        }
        if (value === 'even') {
          this.properties = {
            page: {
              margin: { top: '1cm', right: '4cm', bottom: '1cm', left: '1cm' }
            }
          }
        }
      }
      setHeaders() {
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
          })
        };
      }
      async setImg1(value) {
        const localThis = this

        this.children.push(await ParagraphImg(value))
        this.children.push(ParagraphImgDesc(value))

        async function ParagraphImg(img) {

          const loadedImg = await loadImg(img)

          return new Paragraph(
            {
              alignment: localThis.CENTER,
              children: [
                new TextRun({
                  font: localThis.FONT,
                  size: 24,
                  break: 1,
                }),
                new ImageRun(loadedImg)
              ]
            }
          )

          async function loadImg(gallaryImage) {
            const documentSize = {
              width: 0,
              height: 0
            }
            let data = null;
            const transformation = {
              width: 0,
              height: 0
            };

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const gallaryImageZoom = +gallaryImage.getZoom();
            const gallaryImageArrowsArray = gallaryImage.getArrowsArray();
            const gallaryImageArrowsColor = gallaryImage.getArrowsColor();
            const gallaryImageArrowsWidth = gallaryImage.getArrowsWidth();

            switch (gallaryImage.getOrientation()) {
              case 'panorama':
                documentSize.width = 605
                documentSize.height = 0
                break;
              case 'horizontal':
                documentSize.width = 567
                documentSize.height = 378
                break;
              case 'vertical':
                documentSize.width = 340
                documentSize.height = 452
                break;
              case '9X6':
                documentSize.width = 340
                documentSize.height = 227
                break;
              case '6X9':
                documentSize.width = 227
                documentSize.height = 340
                break;
              default:
                break;
            }

            await new Promise((onSuccess) => {
              img.addEventListener('load', function () {
                ctx.canvas.width = this.width;
                ctx.canvas.height = this.height;

                if (gallaryImage.getOrientation() === 'panorama') {
                  transformation.width = documentSize.width
                  transformation.height = (documentSize.width / this.width) * this.height
                } else {
                  transformation.width = documentSize.width
                  transformation.height = documentSize.height
                }

                const zoom = gallaryImageZoom / 100;
                const imgW = this.width * zoom;
                const imgH = this.height * zoom;

                ctx.drawImage(img, 0, 0, imgW, imgH);

                if (gallaryImageArrowsArray.length > 0) {
                  for (const item of gallaryImageArrowsArray) {
                    drawArrowArray(ctx, item.getNumber(), gallaryImageArrowsColor, gallaryImageArrowsWidth, item.x1, item.y1, item.x2, item.y2);
                  }
                }
                onSuccess();
              })
              img.src = gallaryImage.getUrl();
            });

            await new Promise((onSuccess) => {
              data = canvas.toDataURL('image/jpeg', 1);
              onSuccess();
            });

            return { data: data, transformation: transformation }
          }
        }
        function ParagraphImgDesc(img) {

          return new Paragraph(
            {
              alignment: localThis.JUSTIFIED,
              indent: getIndent(img),
              children: [
                new TextRun({
                  text: `Фото №${img.index}. `,
                  font: "Times New Roman",
                  size: 26,
                  bold: true,
                }),
                new TextRun({
                  text: img.imgDesc,
                  font: "Times New Roman",
                  size: 26,
                }),
                descAddedArrows(img)
              ]
            }
          )

          function descAddedArrows(gallaryImage) {
            if (gallaryImage.arrowsArray?.length > 0) {
              let str = ''

              for (const item of gallaryImage.arrowsArray) {
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
          function getIndent(gallaryImage) {
            switch (gallaryImage.getOrientation()) {
              case 'panorama':
                return localThis.INDENT_PANORAMA
              case 'horizontal':
                return localThis.INDENT_HORIZONTAL
              case 'vertical':
                return localThis.INDENT_VERTICAL
              case '9X6':
                return localThis.INDENT_9x6
              case '6X9':
                return localThis.INDENT_6x9_1
              default:
                break;
            }
          }
        }
      }
      async setImg2(value1, value2) {
        const localThis = this

        this.children.push(await TableWithImgs(value1, value2))

        async function TableWithImgs(img1, img2) {

          const paragraphImg1 = await ParagraphImg(img1)
          const paragraphImg2 = await ParagraphImg(img2)

          return new Table(
            {
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: localThis.BORDERS,
                      children: [
                        paragraphImg1
                      ],
                    }),
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: localThis.BORDERS,
                      children: [
                        paragraphImg2
                      ]
                    }),
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      margins: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100,
                      },
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: localThis.BORDERS,
                      children: [
                        ParagraphImgDesc(img1)
                      ]
                    }),
                    new TableCell({
                      margins: {
                        top: 100,
                        bottom: 100,
                        left: 100,
                        right: 100,
                      },
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: localThis.BORDERS,
                      children: [
                        ParagraphImgDesc(img2)
                      ]
                    }),
                  ]
                })
              ]
            }
          )
        }
        async function ParagraphImg(img) {

          const loadedImg = await loadImg(img)

          return new Paragraph(
            {
              alignment: localThis.CENTER,
              children: [
                new TextRun({
                  font: localThis.FONT,
                  size: 24,
                  break: 1,
                }),
                new ImageRun(loadedImg),
              ]
            }
          )

          async function loadImg(gallaryImage) {
            const documentSize = {
              width: 0,
              height: 0
            }
            let data = null;
            const transformation = {
              width: 0,
              height: 0
            };

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            const gallaryImageZoom = +gallaryImage.getZoom();
            const gallaryImageArrowsArray = gallaryImage.getArrowsArray();
            const gallaryImageArrowsColor = gallaryImage.getArrowsColor();
            const gallaryImageArrowsWidth = gallaryImage.getArrowsWidth();

            switch (gallaryImage.getOrientation()) {
              case 'panorama':
                documentSize.width = 605
                documentSize.height = 0
                break;
              case 'horizontal':
                documentSize.width = 567
                documentSize.height = 378
                break;
              case 'vertical':
                documentSize.width = 340
                documentSize.height = 452
                break;
              case '9X6':
                documentSize.width = 340
                documentSize.height = 227
                break;
              case '6X9':
                documentSize.width = 227
                documentSize.height = 340
                break;
              default:
                break;
            }

            await new Promise((onSuccess) => {
              img.addEventListener('load', function () {
                ctx.canvas.width = this.width;
                ctx.canvas.height = this.height;

                if (gallaryImage.getOrientation() === 'panorama') {
                  transformation.width = documentSize.width
                  transformation.height = (documentSize.width / this.width) * this.height
                } else {
                  transformation.width = documentSize.width
                  transformation.height = documentSize.height
                }

                const zoom = gallaryImageZoom / 100;
                const imgW = this.width * zoom;
                const imgH = this.height * zoom;

                ctx.drawImage(img, 0, 0, imgW, imgH);

                if (gallaryImageArrowsArray.length > 0) {
                  for (const item of gallaryImageArrowsArray) {
                    drawArrowArray(ctx, item.getNumber(), gallaryImageArrowsColor, gallaryImageArrowsWidth, item.x1, item.y1, item.x2, item.y2);
                  }
                }
                onSuccess();
              })
              img.src = gallaryImage.getUrl();
            });

            await new Promise((onSuccess) => {
              data = canvas.toDataURL('image/jpeg', 1);
              onSuccess();
            });

            return { data: data, transformation: transformation }
          }
        }
        function ParagraphImgDesc(img) {

          return new Paragraph(
            {
              alignment: localThis.JUSTIFIED,
              indent: localThis.INDENT_6x9_2,
              children: [
                new TextRun({
                  text: `Фото №${img.index}. `,
                  font: localThis.FONT,
                  size: 26,
                  bold: true,
                }),
                new TextRun({
                  text: img.imgDesc,
                  font: localThis.FONT,
                  size: 26,
                }),
                descAddedArrows(img)
              ]
            }
          )

          function descAddedArrows(gallaryImage) {
            if (gallaryImage.arrowsArray?.length > 0) {
              let str = ''

              for (const item of gallaryImage.arrowsArray) {
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
      }
      setNote(value) {
        const localThis = this

        this.children.push(ParagraphNote(value))

        function ParagraphNote(note) {
          return new Paragraph(
            {
              alignment: localThis.JUSTIFIED,
              children: [
                new TextRun({
                  font: localThis.FONT,
                  size: 24,
                  break: 1,
                }),
                new TextRun({
                  text: `${localThis.note}`,
                  bold: false,
                  font: localThis.FONT,
                  size: 24,
                })
              ]
            })
        }
      }
    }

    let title = 0
    let note = 0
    let photoPage = 1

    for (let i = 0; i < this.galleryImages.length; i++) {
      if (title === 0) {
        const pp = new PhotoPage(this.galleryImages, this.photoTableData, this.settings)
        pp.setType(`title`)
        pp.setParity('odd')
        await pp.setImg1(this.galleryImages[i])
        title++

        const sections = this.getSections();
        sections.push(pp);
        this.setSections(sections);
      } else {
        const pp = new PhotoPage(this.galleryImages, this.photoTableData, this.settings)
        pp.setType(`page`)
        pp.setParity(photoPage % 2 === 0 ? 'odd' : 'even')
        pp.setHeaders()

        if (this.galleryImages[i].getOrientation() !== '6X9') {
          await pp.setImg1(this.galleryImages[i])
        } else {
          if (this.galleryImages[i + 1]?.getOrientation() === '6X9') {
            await pp.setImg2(this.galleryImages[i], this.galleryImages[i + 1])
            i++
          } else {
            await pp.setImg1(this.galleryImages[i])
          }
        }

        if (this.galleryImages[i + 1] !== undefined) {
          if (this.galleryImages[i + 1].getOrientation() !== '6X9') {
            await pp.setImg1(this.galleryImages[i + 1])
          } else {
            if (this.galleryImages[i + 2]?.getOrientation() === '6X9') {
              await pp.setImg2(this.galleryImages[i + 1], this.galleryImages[i + 2])
              i++
            } else {
              await pp.setImg1(this.galleryImages[i + 1])
            }
          }
        } else {
          pp.setNote(this.note)
          note++
        }

        const sections = this.getSections();
        sections.push(pp);
        this.setSections(sections);

        i++
        photoPage++
      }
    }

    if (note === 0) {
      const pp = new PhotoPage(this.galleryImages, this.photoTableData, this.settings)
      pp.setType(`page`)
      pp.setParity(photoPage % 2 === 0 ? 'odd' : 'even')
      pp.setNote(this.note)

      const sections = this.getSections();
      sections.push(pp);
      this.setSections(sections);

      note++
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