import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import GallaryImage from '../../entities/GalleryImage';

const MenuBtnsCloseBtn = () => {
  const localModalProperties = useContext(modalDataContext);
  let clickHandler;

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "preview") {
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
      localModalProperties.setphotoTableData(() => {
        return {
          numbOMP: null,
          factOMP: null,
          adressOMP: null,
          dateOMP: null,
          dateForDoc: null,
          unit: null,
          kusp: null,
          executor: null
        }
      });
    }
  }
  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "setSettings") {
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
      localModalProperties.setGalleryImg(new GallaryImage());
    }
  }  
  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "about") {
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
  return (<div className="close-btn" onClick={clickHandler}></div>)
}

export default MenuBtnsCloseBtn;