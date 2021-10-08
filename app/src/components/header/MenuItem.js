import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { saveAs } from "file-saver";
import "./MenuItem.css";

const MenuItem = ({ children, type, notActive, setDownloadedImages, galleryImages, photoTableData }) => {

  const localModalProperties = useContext(modalDataContext);

  function loadImgs(event) {
    event.preventDefault();
    const input = document.querySelector('.file');
    function change() {
      const imagedata = [];

      for (let i = 0; i < input.files.length; i++) {
        imagedata.push({ name: input.files[i].name, url: URL.createObjectURL(input.files[i]) });
      }

      setDownloadedImages(imagedata)
      input.removeEventListener('change', change);
    }
    input.click();
    input.addEventListener('change', change);
  }

  function delImgFromPhotoTable(event) {
    event.preventDefault()

    const tempGalleryImages = [...localModalProperties.galleryImages];
    tempGalleryImages.splice(localModalProperties.modalProperties.indexImgInGallery, 1);
    localModalProperties.setGalleryImages(tempGalleryImages);

    localModalProperties.setModalProperties(() => {
      return {
        isOpen: false,
        type: null,
        nameImg: null,
        urlImg: null,
        textImg: null,
        indexImgInGallery: null
      }
    });
  }

  function forCutPhoto(event) {
    event.preventDefault();

    localModalProperties.setModalProperties(() => {
      return {
        ...localModalProperties.modalProperties,
        type: 'cutPhoto'
      }
    });
  }

  async function convertToMicrosoftWord(event) {
    event.preventDefault();

    const sectionsArr = [];

    if (galleryImages.length && photoTableData.dateForDoc && photoTableData.factOMP && photoTableData.adressOMP) {
      let frontSide = false;
      let officialStatus = 'специалист';
      let officialName = 'А.А. Андреев';
      let note = 'Примечание: для изготовления фототаблицы исползовались цифровая фотокамера "CANON 470" серийный номер № 6636356966, с объективом "CANON ZOOM LENS 3,4, 6.3-21.6 mm 1:3.0-5.8", фотовспышка "CANON", карта памяти "Kingston 8 Gb" серийный номер № 1473277457, ПЭВМ, принтер "Panasonic KX MB 1500".';

      //Титульная страница
      sectionsArr.push(
        {
          properties: {
            page: {
              margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
            }
          },
          footers: {
            default: new Footer({
              children: [
                new Paragraph(
                  {
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        text: `${officialStatus} _______________ ${officialName}`,
                        font: "Times New Roman",
                        size: 24,
                      })
                    ]
                  }
                ),
              ],
            })
          },
          children: [
            new Paragraph(
              {
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ",
                    bold: true,
                    font: "Times New Roman",
                    size: 28,
                  })
                ]
              }
            ),
            new Paragraph(
              {
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "ПО РЕСПУБЛИКЕ КРЫМ",
                    bold: true,
                    font: "Times New Roman",
                    size: 28,
                  })
                ]
              }
            ),
            new Paragraph(
              {
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР",
                    bold: true,
                    font: "Times New Roman",
                    size: 28,
                  })
                ]
              }
            ),
            new Paragraph(
              {
                alignment: AlignmentType.JUSTIFIED,
                thematicBreak: true,
                children: [
                  new TextRun({
                    text: "295048, г. Симферополь, ул. Балаклавская, д. 68",
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
            new Paragraph(
              {
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "ФОТОТАБЛИЦА",
                    bold: true,
                    font: "Times New Roman",
                    size: 36,
                    break: 2,
                  })
                ]
              }
            ),
            new Paragraph(
              {
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    font: "Times New Roman",
                    size: 24,
                    break: 1,
                  })
                ]
              }
            ),
            new Paragraph(
              {
                alignment: AlignmentType.JUSTIFIED,
                indent: { firstLine: 721 },
                children: [
                  new TextRun({
                    text: `к протоколу осмотра места происшествия от ${photoTableData.dateForDoc} по факту ${photoTableData.factOMP} по адресу: ${photoTableData.adressOMP}.`,
                    font: "Times New Roman",
                    size: 24,
                  })
                ]
              }
            ),
          ],
        }
      );

      //Страницы с фотографиями
      for (let i = 0; i < (galleryImages.length / 2); i++) {
        if (!frontSide) {
          const tempParagraphArr = [];

          if (i === 0) {
            for (let j = i; j < 2; j++) {
              let blob = await fetch(galleryImages[j].urlImg).then(r => r.blob());
              tempParagraphArr.push(
                new Paragraph(
                  {
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        font: "Times New Roman",
                        size: 24,
                        break: 1,
                      }),
                      new ImageRun({
                        data: blob,
                        transformation: galleryImages[j].orientation === 'vertical' ? {
                          width: 340,
                          height: 454,
                        } : {
                          width: 454,
                          height: 340,
                        },

                      }),
                    ]
                  }
                ),
                new Paragraph(
                  {
                    indent: galleryImages[j].orientation === 'vertical' ? { firstLine: 1988 } : { firstLine: 1136 },
                    children: [
                      new TextRun({
                        text: `Фото №${j + 1}. `,
                        font: "Times New Roman",
                        size: 26,
                        bold: true,
                      }),
                      new TextRun({
                        text: galleryImages[j].textImg,
                        font: "Times New Roman",
                        size: 26,
                      }),
                    ]
                  }
                ),
              )
            }
          }
          if (i > 0) {
            for (let j = i + i; j < (i + i + 2); j++) {
              let blob = await fetch(galleryImages[j].urlImg).then(r => r.blob());
              tempParagraphArr.push(
                new Paragraph(
                  {
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        font: "Times New Roman",
                        size: 24,
                        break: 1,
                      }),
                      new ImageRun({
                        data: blob,
                        transformation: galleryImages[j].orientation === 'vertical' ? {
                          width: 340,
                          height: 454,
                        } : {
                          width: 454,
                          height: 340,
                        },

                      }),
                    ]
                  }
                ),
                new Paragraph(
                  {
                    indent: galleryImages[j].orientation === 'vertical' ? { firstLine: 1988 } : { firstLine: 1136 },
                    children: [
                      new TextRun({
                        text: `Фото №${j + 1}. `,
                        font: "Times New Roman",
                        size: 26,
                        bold: true,
                      }),
                      new TextRun({
                        text: galleryImages[j].textImg,
                        font: "Times New Roman",
                        size: 26,
                      }),
                    ]
                  }
                ),
              )
            }
          }

          sectionsArr.push(
            {
              properties: {
                page: {
                  margin: { top: '1cm', right: '4cm', bottom: '1cm', left: '1cm' }
                }
              },
              headers: {
                default: new Header({
                  children: [
                    new Paragraph(
                      {
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            children: [PageNumber.CURRENT],
                            font: "Times New Roman",
                            size: 24,
                          })
                        ]
                      }
                    ),
                  ],
                }),
              },
              footers: {
                default: new Footer({
                  children: [
                    new Paragraph(
                      {
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `${officialStatus} _______________ ${officialName}`,
                            font: "Times New Roman",
                            size: 24,
                          })
                        ]
                      }
                    ),
                  ],
                })
              },
              children: tempParagraphArr,
            }
          );

          frontSide = !frontSide;
          continue;
        }

        if (frontSide) {
          const tempParagraphArr = [];

          if (i > 0) {
            for (let j = i + i; j < (i + i + 2); j++) {
              let blob = await fetch(galleryImages[j].urlImg).then(r => r.blob());
              tempParagraphArr.push(
                new Paragraph(
                  {
                    alignment: AlignmentType.CENTER,
                    children: [
                      new TextRun({
                        font: "Times New Roman",
                        size: 24,
                        break: 1,
                      }),
                      new ImageRun({
                        data: blob,
                        transformation: galleryImages[j].orientation === 'vertical' ? {
                          width: 340,
                          height: 454,
                        } : {
                          width: 454,
                          height: 340,
                        },

                      }),
                    ]
                  }
                ),
                new Paragraph(
                  {
                    indent: galleryImages[j].orientation === 'vertical' ? { firstLine: 1988 } : { firstLine: 1136 },
                    children: [
                      new TextRun({
                        text: `Фото №${j + 1}. `,
                        font: "Times New Roman",
                        size: 26,
                        bold: true,
                      }),
                      new TextRun({
                        text: galleryImages[j].textImg,
                        font: "Times New Roman",
                        size: 26,
                      }),
                    ]
                  }
                ),
              )
            }
          }

          sectionsArr.push(
            {
              properties: {
                page: {
                  margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
                }
              },
              headers: {
                default: new Header({
                  children: [
                    new Paragraph(
                      {
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            children: [PageNumber.CURRENT],
                            font: "Times New Roman",
                            size: 24,
                          })
                        ]
                      }
                    ),
                  ],
                }),
              },
              footers: {
                default: new Footer({
                  children: [
                    new Paragraph(
                      {
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: `${officialStatus} _______________ ${officialName}`,
                            font: "Times New Roman",
                            size: 24,
                          })
                        ]
                      }
                    ),
                  ],
                })
              },
              children: tempParagraphArr,
            }
          );

          frontSide = !frontSide;
          continue;
        }
      }

      //Примечание
      if (frontSide) {
        sectionsArr.push(
          {
            properties: {
              page: {
                margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '4cm' }
              }
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph(
                    {
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: `${officialStatus} _______________ ${officialName}`,
                          font: "Times New Roman",
                          size: 24,
                        })
                      ]
                    }
                  ),
                ],
              })
            },
            children: [
              new Paragraph(
                {
                  alignment: AlignmentType.JUSTIFIED,
                  children: [
                    new TextRun({
                      text: note,
                      font: "Times New Roman",
                      size: 26,
                    })
                  ]
                }
              )
            ],
          }
        );        
      } else {
        sectionsArr.push(
          {
            properties: {
              page: {
                margin: { top: '1cm', right: '4cm', bottom: '1cm', left: '1cm' }
              }
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph(
                    {
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: `${officialStatus} _______________ ${officialName}`,
                          font: "Times New Roman",
                          size: 24,
                        })
                      ]
                    }
                  ),
                ],
              })
            },
            children: [
              new Paragraph(
                {
                  alignment: AlignmentType.JUSTIFIED,
                  children: [
                    new TextRun({
                      text: note,
                      font: "Times New Roman",
                      size: 26,
                    })
                  ]
                }
              )
            ],
          }
        );
      }
    }

    const doc = new Document({
      title: "My Document",
      sections: sectionsArr
    });


    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }

  if (notActive) {
    return (
      <div className="menu-item menu-not-active"><a href="/" onClick={(event) => { event.preventDefault() }}>{children}</a></div>
    );
  }
  if (type === 'forInputFile') {
    return (
      <div className="menu-item input-file">
        <input type="file" className="file" multiple={true} accept="image/*"></input>
        <a href="/" onClick={loadImgs}>{children}</a>
      </div>
    );
  }
  if (type === 'forDelImgFromPhotoTable') {
    return (
      <div className="menu-item" onClick={delImgFromPhotoTable}><a href="/" >{children}</a></div>
    );
  }
  if (type === 'forCutPhoto') {
    return (
      <div className="menu-item" onClick={forCutPhoto}><a href="/" >{children}</a></div>
    );
  }
  if (type === 'forConvertToMicrosoftWord') {
    return (
      <div className="menu-item" onClick={convertToMicrosoftWord}><a href="/" >{children}</a></div>
    );
  }
  return (
    <div className="menu-item"><a href="/" >{children}</a></div>
  );

    // let img = new Image();
    // img.onload = function () {
    //   let width = this.width;
    //   console.log('width: ', width);
    //   let hight = this.height;
    //   console.log('hight: ', hight);
    // }
    // img.src = galleryImages[0].urlImg;
}

export default MenuItem;