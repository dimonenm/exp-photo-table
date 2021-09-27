import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import "./MenuBtnsCheckBtn.css";



const MenuBtnsCheckBtn = () => {

  const localModalProperties = useContext(modalDataContext);

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "setPhotoTableData") {
    function clickHandler() {
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
    return (<div className="check-btn" onClick={clickHandler}></div>)
  }

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "setGalleryImageData") {
    function clickHandler() {
      
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
    return (<div className="check-btn" onClick={clickHandler}></div>)
  }

}

export default MenuBtnsCheckBtn;