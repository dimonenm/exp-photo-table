import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import GallaryImage from '../../entities/GalleryImage';

const MenuBtnsCloseBtn = () => {
  const localModalProperties = useContext(modalDataContext);

  function clickHandler() {
    function modalReset() {
      return {
        isOpen: false,
        type: null,
        nameImg: null,
        urlImg: null,
        textImg: null,
        indexImgInGallery: null
      }
    }
    if (localModalProperties.modalProperties.type === "setPhotoTableData") {
      localModalProperties.setModalProperties(modalReset());
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
    else if (localModalProperties.modalProperties.type === "editPhoto") {
      localModalProperties.setModalProperties(modalReset());

      localModalProperties.setGalleryImg(new GallaryImage());
    }
    else {
      localModalProperties.setModalProperties(modalReset());
    }
  }


  return (<div className="close-btn" onClick={clickHandler}></div>)
}

export default MenuBtnsCloseBtn;