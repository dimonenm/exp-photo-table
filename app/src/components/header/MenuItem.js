import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
// import { Document, Packer, Paragraph, Header, Footer, TextRun, AlignmentType, PageNumber, ImageRun } from "docx";
// import { saveAs } from "file-saver";
import "./MenuItem.css";
import GallaryImage from '../../entities/GalleryImage';
import WordDocument from '../../entities/WordDocument';

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

    const filteredGalleryImages = [...localModalProperties.galleryImages].filter((item) => {
      if (item.getIndex() === localModalProperties.modalProperties.indexImgInGallery) {
        return false;
      }
      return true;
    });
    
    for (let i = 0; i < filteredGalleryImages.length; i++) {
      filteredGalleryImages[i].setIndex(i + 1);
    }

    localModalProperties.setGalleryImages(filteredGalleryImages);
    localModalProperties.setGalleryImg(new GallaryImage())
    localModalProperties.setModalProperties(() => {
      return {
        isOpen: false,
        type: null,
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
  function forEditPhoto(event) {
    event.preventDefault();

    localModalProperties.setModalProperties(() => {
      return {
        ...localModalProperties.modalProperties,
        type: 'editPhoto'
      }
    });
  }

  async function convertToMicrosoftWord(event) {
    event.preventDefault();

    const wordDocument = new WordDocument(galleryImages, photoTableData);
    await wordDocument.addTitlePage();    
    wordDocument.saveDocument();
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
  if (type === 'forEditPhoto') {
    return (
      <div className="menu-item" onClick={forEditPhoto}><a href="/" >{children}</a></div>
    );
  }

  return (
    <div className="menu-item"><a href="/" >{children}</a></div>
  );
}

export default MenuItem;