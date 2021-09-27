import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import "./MenuBtnsCloseBtn.css";

const MenuBtnsCloseBtn = () => {
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
      localModalProperties.setphotoTableData(() => {
        return {
          factOMP: null,
          adressOMP: null,
          dateOMP: null
        }
      });
    }
    return (<div className="close-btn" onClick={clickHandler}></div>)
  }

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "setGalleryImageData") {
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
    return (<div className="close-btn" onClick={clickHandler}></div>)
  }

  if (localModalProperties.modalProperties.isOpen &&
    localModalProperties.modalProperties.type === "preview") {
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
    return (<div className="close-btn" onClick={clickHandler}></div>)
  }
}

export default MenuBtnsCloseBtn;