import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import saveSettings from '../../services/forModalHeader/fSaveSettings';
import GallaryImage from '../main/entities/GalleryImage';
import "./MenuBtnsCheckBtn.css";



const MenuBtnsCheckBtn = () => {

  const localModalProperties = useContext(modalDataContext);

  let clickHandler;

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "setPhotoTableData") {
    clickHandler = () => {
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
  }
  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "editPhoto") {
    clickHandler = () => {

      const newGalleryImg = localModalProperties.galleryImg;
      const newGalleryImages = localModalProperties.galleryImages.map((item) => {
        if (item.getIndex() === newGalleryImg.getIndex()) {
          return Object.assign(new GallaryImage(), newGalleryImg);
        }
        return item;
      });

      localModalProperties.setGalleryImages(newGalleryImages);
      localModalProperties.setGalleryImg(new GallaryImage());
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
  }

  // if (localModalProperties.modalProperties.isOpen &&
  //   localModalProperties.modalProperties.type === "setGalleryImageData") {
  //   clickHandler = () => {

  //     const tempGalleryImages = [...localModalProperties.galleryImages];
  //     tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].textImg = localModalProperties.modalProperties.textImg;
  //     localModalProperties.setGalleryImages(tempGalleryImages);

  //     localModalProperties.setModalProperties(() => {
  //       return {
  //         isOpen: false,
  //         type: null,
  //         nameImg: null,
  //         urlImg: null,
  //         textImg: null,
  //         indexImgInGallery: null
  //       }
  //     });
  //   }
  // }

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "cutPhoto") {
    clickHandler = () => {
      localModalProperties.setModalProperties((prev) => {
        return { ...prev, cut: true }
      });
    }
  }
  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "setSettings") {
    clickHandler = () => {
      saveSettings(localModalProperties.settings)
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
  }

  return (<div className="check-btn" onClick={clickHandler}></div>)
}

export default MenuBtnsCheckBtn;