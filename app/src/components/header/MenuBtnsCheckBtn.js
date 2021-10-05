import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
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
    localModalProperties.modalProperties.type === "setGalleryImageData") {
    clickHandler = () => {
      
      const tempGalleryImages = [...localModalProperties.galleryImages];
      tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].textImg = localModalProperties.modalProperties.textImg;
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
  }

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "cutPhoto") {
    clickHandler = () => {
      console.log('MenuBtnsCheckBtn for cutPhoto');
      
      // const tempGalleryImages = [...localModalProperties.galleryImages];
      // tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].textImg = localModalProperties.modalProperties.textImg;
      // localModalProperties.setGalleryImages(tempGalleryImages);
      
      // localModalProperties.setModalProperties(() => {
      //   return {
      //     isOpen: false,
      //     type: null,
      //     nameImg: null,
      //     urlImg: null,
      //     textImg: null,
      //     indexImgInGallery: null
      //   }
      // });
    }
  }
  
  return (<div className="check-btn" onClick={clickHandler}></div>)
}

export default MenuBtnsCheckBtn;