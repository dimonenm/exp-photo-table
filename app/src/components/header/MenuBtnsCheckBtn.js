import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import "./MenuBtnsCheckBtn.css";



const MenuBtnsCheckBtn = () => {

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
    <div className="check-btn" onClick={clickHandler}></div>
  )
}

export default MenuBtnsCheckBtn;