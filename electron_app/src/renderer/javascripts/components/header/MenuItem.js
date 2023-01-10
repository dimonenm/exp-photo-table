import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import GallaryImage from '../../entities/GalleryImage';
import WordDocument from '../../entities/WordDocument';

const MenuItem = ({ children, type, notActive, setDownloadedImages, galleryImages, photoTableData, modalProperties, setModalProperties, settings }) => {

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
    const isNotAllImgsCutted = galleryImages.find((item) => {
      if (item.getImgCuted() === false) {
        return true
      }
      return false
    })

    if (isNotAllImgsCutted) {
      const conf = confirm('У вас остались не обрезанные фотографии. Вы уверенны что хотите сформировать документ?')
      if (conf) {
        const wordDocument = new WordDocument(galleryImages, photoTableData, settings);
        await wordDocument.addPages();
        wordDocument.saveDocument();
      }
    } else {
      const wordDocument = new WordDocument(galleryImages, photoTableData, settings);
      await wordDocument.addPages();
      wordDocument.saveDocument();
    }

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
  function forsetPhotoTableData(event) {
    event.preventDefault();
    setModalProperties(prev => {
      return (
        {
          ...prev,
          isOpen: true,
          type: "setPhotoTableData"
        }
      );
    }
    )
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
  if (type === 'forsetPhotoTableData') {
    return (
      <div className="menu-item" onClick={forsetPhotoTableData}><a href="/" >{children}</a></div>
    );
  }
  if (type === 'forDelImgFromPhotoTable') {
    return (
      <div className="menu-item" onClick={delImgFromPhotoTable}><a href="/" >{children}</a></div>
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