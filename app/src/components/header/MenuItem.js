import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import "./MenuItem.css";

const MenuItem = ({ children, type, notActive, inputFile, setDownloadedImages }) => {

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

  function convertToMicrosoftWord(event) {
    event.preventDefault();


    const doc = new Document({
      creator: "Максименко Роман",
      description: "My extremely interesting document",
      title: "My Document",
      background: {
        color: "ffffff",
      },
      sections: [{
        properties: {
          page: {
            // size: {
            //   width: 100,
            //   height: 100,
            //   orientation: "portrait"
            // },
            margin: { top: '2cm', right: '1.5cm', bottom: '2cm', left: '3cm' }
          }
        },
        children: [
          new Paragraph({
            children: [
              new TextRun("Привет "),
              new TextRun({
                text: "Рома",
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Хочешь научиться делать так?")
            ],
          })
        ],
      }]
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