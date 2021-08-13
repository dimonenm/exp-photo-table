import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import "./MenuBtnsCloseBtn.css";

const MenuBtnsCloseBtn = () => {
  const localModalProperties = useContext(modalDataContext);

  function clickHandler() {
    localModalProperties.setModalProperties(() => {
      return {
        isOpen: false,
        type: null,
        nameImg: null,
        urlImg: null
      }
    });
  }
  return (
    <div className="close-btn" onClick={clickHandler}></div>
  )
}

export default MenuBtnsCloseBtn;