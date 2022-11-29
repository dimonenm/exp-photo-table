import { Document, Packer, Paragraph, Header, Footer, TextRun, ImageRun, AlignmentType, PageNumber, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import TitlePage from "./TitlePage";
import PhotoPage from "./PhotoPage";
import PhotoTableImg from "./PhotoTableImg";
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
      INDENT_VERTICAL = { firstLine: 1984 }
      INDENT_HORIZONTAL = { firstLine: 1133 }
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
                      text: `${this.official_status} _______________ ${photoTableData.executor}`,
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
      // функции доступа к полям
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
      getChildren() {
        return this.children
      }
      // функции изменения полей
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
      setProperties(value) {
        this.properties = value
      }
      setImages(value) {
        this.images = value
      }
      setChildren(value) {
        this.children = value;
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
      // служебные функции
      getIndent(orientation, double = false) {
        let indent = 0
        switch (orientation) {
          case 'horizontal':
            indent = this.INDENT_HORIZONTAL
            break;
          case 'vertical':
            indent = this.INDENT_VERTICAL
            break;
          case '9X6':
            indent = this.INDENT_9x6
            break;
          case '6X9':
            indent = this.INDENT_6x9_1
            if (double) {
              indent = this.INDENT_6x9_2
            }
            break;
          default:
            break;
        }
        return indent
      }
      descAddedArrows(img) {
        if (img.getArrowsArray().length > 0) {
          let str = ''

          for (const item of img.getArrowsArray()) {
            if (str) {
              str += `, ${item.getNumber()}. ${item.getText()}`
            }
            if (!str) {
              str += `${item.getNumber()}. ${item.getText()}`
            }
          }
          return new TextRun({
            text: ` (${str}).`
          })
        }
      }
      async addFirstLineItem() {

        const children = this.getChildren();

        if (this.getFirstHalfImages().length === 1) {
          children.push(
            new Paragraph(
              {
                alignment: this.CENTER,
                children: [
                  new TextRun({
                    font: this.FONT,
                    size: 24,
                    break: 1,
                  }),
                  new ImageRun({ data: this.getFirstHalfImages()[0].getData(), transformation: this.getFirstHalfImages()[0].getTransformation() })
                ]
              }
            )
          )
          children.push(
            new Paragraph(
              {
                alignment: this.JUSTIFIED,
                indent: this.getIndent(this.getFirstHalfImages()[0].getOrientation()),
                children: [
                  new TextRun({
                    text: `Фото №${this.getFirstHalfImages()[0].getIndex()}. `,
                    font: "Times New Roman",
                    size: 26,
                    bold: true,
                  }),
                  new TextRun({
                    text: this.getFirstHalfImages()[0].getDescription(),
                    font: "Times New Roman",
                    size: 26,
                  }),
                  this.descAddedArrows(this.getFirstHalfImages()[0])
                ]
              }
            )
          )
        } else if (this.getFirstHalfImages().length === 2) {
          children.push(
            new Table(
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
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.CENTER,
                              children: [
                                new TextRun({
                                  font: this.FONT,
                                  size: 24,
                                  break: 1,
                                }),
                                new ImageRun({ data: this.getFirstHalfImages()[0].getData(), transformation: this.getFirstHalfImages()[0].getTransformation() }),
                              ]
                            }
                          )
                        ],
                      }),
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.CENTER,
                              children: [
                                new TextRun({
                                  font: this.FONT,
                                  size: 24,
                                  break: 1,
                                }),
                                new ImageRun({ data: this.getFirstHalfImages()[1].getData(), transformation: this.getFirstHalfImages()[1].getTransformation() }),
                              ]
                            }
                          )
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
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.JUSTIFIED,
                              indent: this.getIndent(this.getFirstHalfImages()[0].getOrientation(), true),
                              children: [
                                new TextRun({
                                  text: `Фото №${this.getFirstHalfImages()[0].getIndex()}. `,
                                  font: "Times New Roman",
                                  size: 26,
                                  bold: true,
                                }),
                                new TextRun({
                                  text: this.getFirstHalfImages()[0].getDescription(),
                                  font: "Times New Roman",
                                  size: 26,
                                }),
                                this.descAddedArrows(this.getFirstHalfImages()[0])
                              ]
                            }
                          )
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
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.JUSTIFIED,
                              indent: this.getIndent(this.getFirstHalfImages()[1].getOrientation(), true),
                              children: [
                                new TextRun({
                                  text: `Фото №${this.getFirstHalfImages()[1].getIndex()}. `,
                                  font: "Times New Roman",
                                  size: 26,
                                  bold: true,
                                }),
                                new TextRun({
                                  text: this.getFirstHalfImages()[1].getDescription(),
                                  font: "Times New Roman",
                                  size: 26,
                                }),
                                this.descAddedArrows(this.getFirstHalfImages()[1]),
                              ]
                            }
                          )
                        ]
                      }),
                    ]
                  })
                ]
              }
            )
          )
        }

        this.setChildren(children);
      }
      async addSecondLineItem() {

        const children = this.getChildren();

        if (this.getSecondHalfImages().length === 1) {
          children.push(
            new Paragraph(
              {
                alignment: this.CENTER,
                children: [
                  new TextRun({
                    font: this.FONT,
                    size: 24,
                    break: 1,
                  }),
                  new ImageRun({ data: this.getSecondHalfImages()[0].getData(), transformation: this.getSecondHalfImages()[0].getTransformation() })
                ]
              }
            )
          )
          children.push(
            new Paragraph(
              {
                alignment: this.JUSTIFIED,
                indent: this.getIndent(this.getSecondHalfImages()[0].getOrientation()),
                children: [
                  new TextRun({
                    text: `Фото №${this.getSecondHalfImages()[0].getIndex()}. `,
                    font: "Times New Roman",
                    size: 26,
                    bold: true,
                  }),
                  new TextRun({
                    text: this.getSecondHalfImages()[0].getDescription(),
                    font: "Times New Roman",
                    size: 26,
                  }),
                  this.descAddedArrows(this.getSecondHalfImages()[0])
                ]
              }
            )
          )
        } else if (this.getSecondHalfImages().length === 2) {
          children.push(
            new Table(
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
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.CENTER,
                              children: [
                                new TextRun({
                                  font: this.FONT,
                                  size: 24,
                                  break: 1,
                                }),
                                new ImageRun({ data: this.getSecondHalfImages()[0].getData(), transformation: this.getSecondHalfImages()[0].getTransformation() }),
                              ]
                            }
                          )
                        ],
                      }),
                      new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.CENTER,
                              children: [
                                new TextRun({
                                  font: this.FONT,
                                  size: 24,
                                  break: 1,
                                }),
                                new ImageRun({ data: this.getSecondHalfImages()[1].getData(), transformation: this.getSecondHalfImages()[1].getTransformation() }),
                              ]
                            }
                          )
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
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.JUSTIFIED,
                              indent: this.getIndent(this.getSecondHalfImages()[0].getOrientation(), true),
                              children: [
                                new TextRun({
                                  text: `Фото №${this.getSecondHalfImages()[0].getIndex()}. `,
                                  font: "Times New Roman",
                                  size: 26,
                                  bold: true,
                                }),
                                new TextRun({
                                  text: this.getSecondHalfImages()[0].getDescription(),
                                  font: "Times New Roman",
                                  size: 26,
                                }),
                                this.descAddedArrows(this.getSecondHalfImages()[0])
                              ]
                            }
                          )
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
                        borders: this.BORDERS,
                        children: [
                          new Paragraph(
                            {
                              alignment: this.JUSTIFIED,
                              indent: this.getIndent(this.getSecondHalfImages()[1].getOrientation(), true),
                              children: [
                                new TextRun({
                                  text: `Фото №${this.getSecondHalfImages()[1].getIndex()}. `,
                                  font: "Times New Roman",
                                  size: 26,
                                  bold: true,
                                }),
                                new TextRun({
                                  text: this.getSecondHalfImages()[1].getDescription(),
                                  font: "Times New Roman",
                                  size: 26,
                                }),
                                this.descAddedArrows(this.getSecondHalfImages()[1]),
                              ]
                            }
                          )
                        ]
                      }),
                    ]
                  })
                ]
              }
            )
          )
        }

        this.setChildren(children);
      }
      addSupplementItem() {

        const children = this.getChildren();

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
                text: `${this.note}`,
                bold: false,
                font: this.FONT,
                size: 24,
              })
            ]
          })


        children.push(paragraphSupplement);

        this.setChildren(children);
      }

    }
    class ImgItem {
      index = ''
      orientation = ''
      data = ''
      transformation = {
        width: null,
        height: null
      }
      description = ''
      url = ''
      zoom = ''
      arrowsColor = ''
      arrowsWidth = ''
      arrowsArray = []
      constructor({ index, orientation, imgDesc, url, zoom, arrowsColor, arrowsWidth, arrowsArray }) {
        this.index = index
        this.orientation = orientation
        this.description = imgDesc
        this.url = url
        this.zoom = zoom
        this.arrowsColor = arrowsColor
        this.arrowsWidth = arrowsWidth
        this.arrowsArray = arrowsArray
      }
      // функции доступа к полям
      getIndex() {
        return this.index
      }
      getOrientation() {
        return this.orientation
      }
      getData() {
        return this.data;
      }
      getTransformation() {
        return this.transformation;
      }
      getDescription() {
        return this.description
      }
      getUrl() {
        return this.url
      }
      getZoom() {
        return this.zoom
      }
      getArrowsColor() {
        return this.arrowsColor
      }
      getArrowsWidth() {
        return this.arrowsWidth
      }
      getArrowsArray() {
        return this.arrowsArray
      }
      // функции изменения полей
      setIndex(value) {
        this.index = value
      }
      setOrientation(value) {
        this.orientation = value
      }
      setData(value) {
        this.data = value
      }
      setTransformation(w, h) {
        this.transformation = {
          width: w,
          height: h
        };
      }
      setDescription(value) {
        this.description = value
      }
      setUrl(value) {
        this.url = value
      }
      setZoom(value) {
        this.zoom = value
      }
      setArrowsColor(value) {
        this.arrowsColor = value
      }
      setArrowsWidth(value) {
        this.arrowsWidth = value
      }
      setArrowsArray(value) {
        this.arrowsArray = value
      }
      // служебные функции
      async loadImgData() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const gallaryImageZoom = +this.zoom;
        const gallaryImageArrowsArray = this.arrowsArray;
        const gallaryImageArrowsColor = this.arrowsColor;
        const gallaryImageArrowsWidth = this.arrowsWidth;

        switch (this.orientation) {
          case 'panorama':
            ctx.canvas.height = 460;
            ctx.canvas.width = 747;
            break;
          case 'horizontal':
            ctx.canvas.height = 525;
            ctx.canvas.width = 700;
            this.setTransformation(453.33, 340)
            break;
          case 'vertical':
            ctx.canvas.height = 632;
            ctx.canvas.width = 474;
            this.setTransformation(340, 453.33)
            break;
          case '9X6':
            // ctx.canvas.height = 350;
            // ctx.canvas.width = 525;
            ctx.canvas.height = 525;
            ctx.canvas.width = 700;
            this.setTransformation(340, 226.66)
            break;
          case '6X9':
            // ctx.canvas.height = 525;
            // ctx.canvas.width = 350;
            ctx.canvas.height = 632;
            ctx.canvas.width = 474;
            this.setTransformation(226.66, 340)
            break;
          default:
            break;
        }

        await new Promise((onSuccess, onError) => {
          img.addEventListener('load', function () {

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

          img.src = this.url;
        });

        await new Promise((onSuccess, onError) => {
          this.setData(canvas.toDataURL('image/jpeg', 1));
          onSuccess();
        });
      }
    }

    const photoPages = [new PhotoPageItem(this.galleryImages, this.photoTableData, this.settings)]

    for (const img of this.galleryImages) {

      if (img.orientation !== "panorama") {
        const imgItem = new ImgItem(img)
        await imgItem.loadImgData()
        const lastPage = photoPages[photoPages.length - 1]

        if (lastPage.getIsFilled() === false) {
          if (lastPage.getFirstHalfImages().length === 0) {
            lastPage.pushFirstHalfImages(imgItem)
            if (imgItem.getOrientation() !== "6X9") lastPage.setFirstHalf(true)
          }
          else if (lastPage.getFirstHalfImages().length > 0 && lastPage.getFirstHalf() === false) {
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

              const photoPageItem = new PhotoPageItem(this.galleryImages, this.photoTableData, this.settings)
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
      if (page.getParity() === false) {
        page.setProperties(
          {
            page: {
              margin: { top: '1cm', right: '4cm', bottom: '1cm', left: '1cm' }
            }
          }
        )
      } else if (page.getParity() === true) {
        page.setProperties(
          {
            page: {
              margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
            }
          }
        )
      }
      page.addFirstLineItem()
      page.addSecondLineItem()
    }

    if (photoPages[photoPages.length - 1].getIsFilled() === true) {
      const photoPageItem = new PhotoPageItem(this.galleryImages, this.photoTableData, this.settings)
      photoPageItem.addSupplementItem()
      photoPages.push(photoPageItem)
    } else if (photoPages[photoPages.length - 1].getIsFilled() === false) {
      photoPages[photoPages.length - 1].addSupplementItem()
    }

    for (const page of photoPages) {
      this.pushSections(page)
    }
  }

  addPages() {
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

      properties = null
      headers = null
      children = []
      footers = null

      galleryImages
      photoTableData

      type
      parity
      img1
      img2
      img3
      img4
      note

      constructor(galleryImages, photoTableData, settings) {
        this.zip_code = settings.zip_code;
        this.address = settings.address;
        this.tel = settings.tel;
        this.official_status = settings.official_status;

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
              alignment: this.CENTER,
              children: [
                new TextRun({
                  text: text,
                  bold: true,
                  font: this.FONT,
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
              alignment: this.CENTER,
              children: [
                new TextRun({
                  font: this.FONT,
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
              alignment: this.CENTER,
              children: [
                new TextRun({
                  text: text,
                  bold: true,
                  font: this.FONT,
                  size: 28,
                })
              ]
            }
          )
        }
        function ParagraphAddress(zip_code, address, tel) {
          return new Paragraph(
            {
              alignment: this.JUSTIFIED,
              thematicBreak: true,
              children: [
                new TextRun({
                  text: `${zip_code}, ${address}`,
                  bold: false,
                  font: this.FONT,
                  size: 24,
                  break: 2,
                }),
                new TextRun({
                  text: `                                   тел. ${tel}`,
                  bold: false,
                  font: this.FONT,
                  size: 24,
                })
              ]
            }
          )
        }
        function ParagraphDesc(photoTableData) {
          return new Paragraph(
            {
              alignment: this.JUSTIFIED,
              indent: { firstLine: 721 },
              children: [
                new TextRun({
                  text: `к протоколу осмотра места происшествия от ${photoTableData.dateForDoc} по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}.`,
                  font: this.FONT,
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
      async setImg1(value) {


        this.children.push(ParagraphImg(value))
        this.children.push(ParagraphImgDesc(value))

        async function ParagraphImg(img) {

          const loadedImg = await loadImg(img)
          
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
          
        }
      }

      // setDesc(value) { this.desc = value }
      // setImg2(value) { this.img2 = value }
      // setImg3(value) { this.img3 = value }
      // setImg4(value) { this.img4 = value }
      // setNote(value) { this.supplement = value }




    }

    let title = 0
    let note = 0
    let photoPage = 1
    let phPages = []

    for (let i = 0; i < this.galleryImages.length; i++) {
      if (title === 0) {
        const pp = new PhotoPage(galleryImages, photoTableData, settings)
        pp.setType(`title`)
        pp.setParity('odd')
        pp.setImg1(this.galleryImages[i].getOrientation())

        phPages.push(pp)
        title++
      } else {
        const pp = new PhotoPage(galleryImages, photoTableData, settings)
        pp.setType(`page`)
        pp.setDesc('')
        pp.setParity(photoPage % 2 === 0 ? 'odd' : 'even')
        pp.setImg1(this.galleryImages[i].getOrientation())

        if (this.galleryImages[i].getOrientation() === '6X9' && this.galleryImages[i + 1]?.getOrientation() === '6X9') {
          pp.setImg2(this.galleryImages[i + 1]?.getOrientation())
          i++
        }

        pp.setImg3(this.galleryImages[i + 1]?.getOrientation())

        if (this.galleryImages[i + 1]?.getOrientation() === '6X9' && this.galleryImages[i + 2]?.getOrientation() === '6X9') {
          pp.setImg4(this.galleryImages[i + 2]?.getOrientation())
          i++
        }

        if (!pp.getImg3()) {
          pp.setNote('supplement')
          note++
        }

        phPages.push(pp)
        i++
        photoPage++
      }
    }

    if (note === 0) {
      const pp = new PhotoPage(galleryImages, photoTableData, settings)
      pp.setType(`page`)
      pp.setDesc('')
      pp.setParity(photoPage % 2 === 0 ? 'odd' : 'even')
      pp.setNote('supplement')
      phPages.push(pp)
      note++
    }

    console.log('phPages: ', phPages);
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