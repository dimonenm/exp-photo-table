import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { saveAs } from "file-saver";
import "./MenuItem.css";

const MenuItem = ({ children, type, notActive, setDownloadedImages, galleryImages, photoTableData, modalProperties, setModalProperties }) => {

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

    if (
      galleryImages.length &&
      photoTableData.numbOMP &&
      photoTableData.factOMP &&
      photoTableData.adressOMP &&
      photoTableData.dateForDoc &&
      photoTableData.unit &&
      photoTableData.kusp
    ) {
      let frontSide = false;
      let officialStatus = 'специалист';
      let officialName = photoTableData.executor;
      let note = 'Примечание: для изготовления фототаблицы использовались цифровая фотокамера CANON Power Shot SX540 HS со встроенной фотовспышкой, карта памяти ADATA 4 GB, ПЭВМ, МФУ Canon MF421dw.';

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
                    text: "295006, г. Симферополь, ул. Павленко, 1а",
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
      for (let i = 0; i < Math.round(galleryImages.length / 2); i++) {
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
              if (galleryImages[j]?.urlImg) {
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
              if (galleryImages[j]?.urlImg) {
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
      title: `${photoTableData.numbOMP} - ${photoTableData.unit} - КУСП №${photoTableData.kusp} - ${photoTableData.executor}`,
      sections: sectionsArr
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${photoTableData.numbOMP} ${photoTableData.unit} КУСП №${photoTableData.kusp} ${photoTableData.executor}.docx`);
      console.log("Document created successfully");
    });
  }

  function forSetSettingsModal(event) {
    event.preventDefault();

    setModalProperties(() => {
      return {
        ...modalProperties,
        isOpen: true,
        type: 'setSettings'
      }
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
  if (type === 'forConvertToMicrosoftWord') {
    return (
      <div className="menu-item" onClick={convertToMicrosoftWord}><a href="/" >{children}</a></div>
    );
  }
  if (type === 'forSettings') {
    return (
      <div className="menu-item" onClick={forSetSettingsModal}><a href="/" >{children}</a></div>
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

  return (
    <div className="menu-item"><a href="/" >{children}</a></div>
  );
}

export default MenuItem;