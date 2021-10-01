import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
import { saveAs } from "file-saver";
import "./MenuItem.css";

const MenuItem = ({ children, type, notActive, inputFile, setDownloadedImages, galleryImages }) => {

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

  async function convertToMicrosoftWord(event) {
    event.preventDefault();

    let factOMP = 'обнаружение трупа неизвестного мужчины';
    let adressOMP = 'г. Москва, ул. Большая Черемушкинская, д. 73';
    let dateOMP = '23.06.2016';
    let officialStatus = 'специалист';
    let officialName = 'А.А. Андреев';

    const firstPage = [
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
              text: `к протоколу осмотра места происшествия от ${dateOMP} по факту ${factOMP} по адресу: ${adressOMP}.`,
              font: "Times New Roman",
              size: 24,
              break: 2,
            })
          ]
        }
      ),
    ];

    let section1 = {
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
      children: firstPage,
    };

    let blob = await fetch(galleryImages[0].urlImg).then(r => r.blob())

    let img = new Image();
    img.onload = function () {
      let width = this.width;
      console.log('width: ', width);
      let hight = this.height;
      console.log('hight: ', hight);
    }
    img.src = galleryImages[0].urlImg;
    

    const secondPage =
      [
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
                transformation: {
                  width: 340,
                  height: 454,
                },
                
              }),
            ]
          }
        ),
        new Paragraph(
          {
            // alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Фото №1. `,
                font: "Times New Roman",
                size: 26,
                bold: true,
              }),
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
              }),
              new ImageRun({
                data: blob,
                transformation: {
                  width: 454,
                  height: 340,
                }
              }),
            ]
          }
        ),
        new Paragraph(
          {
            // alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Фото №2. `,
                font: "Times New Roman",
                size: 26,
                bold: true,
              }),
            ]
          }
        ),
      ];

    const section2 = {
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
      children: secondPage,
    };

    const doc = new Document({
      title: "My Document",
      sections: [section1, section2]
    });


    Packer.toBlob(doc).then(blob => {
      console.log(blob);
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
  if (type === 'forConvertToMicrosoftWord') {
    return (
      <div className="menu-item" onClick={convertToMicrosoftWord}><a href="/" >{children}</a></div>
    );
  }
  return (
    <div className="menu-item"><a href="/" >{children}</a></div>
  );
}

export default MenuItem;