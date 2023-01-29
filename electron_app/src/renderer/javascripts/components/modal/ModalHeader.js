import React, { useContext } from 'react';
import Logo from '../header/Logo';
import Menu from '../header/Menu';
import MenuBtns from '../header/MenuBtns';
import MenuItem from '../header/MenuItem';
import MenuBtnsCheckBtn from '../header/MenuBtnsCheckBtn';
import MenuBtnsCloseBtn from '../header/MenuBtnsCloseBtn';
import { modalDataContext } from '../../App';

const ModalHeader = ({ name }) => {

  const localModalProperties = useContext(modalDataContext);

  if (localModalProperties.modalProperties.type === "preview") {
    return (
      <div className="modal-header">
        <Logo>{localModalProperties.modalProperties.nameImg}</Logo>
        <MenuBtns>
          <MenuBtnsCloseBtn />
        </MenuBtns>
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "setPhotoTableData") {
    return (
      <div className="modal-header">
        <Logo>{name}</Logo>
        <MenuBtns>
          <MenuBtnsCheckBtn />
          <MenuBtnsCloseBtn />
        </MenuBtns>
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "editPhoto") {
    return (
      <div className="modal-header">
        <Logo>{name}</Logo>
        <Menu>
          <MenuItem type={'forDelImgFromPhotoTable'}>Удалить из таблицы иллюстраций</MenuItem>
        </Menu>
        <MenuBtns>
          <MenuBtnsCheckBtn />
          <MenuBtnsCloseBtn />
        </MenuBtns>
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "setSettings") {
    return (
      <div className="modal-header">
        <Logo>{name}</Logo>
        <MenuBtns>
          <MenuBtnsCheckBtn />
          <MenuBtnsCloseBtn />
        </MenuBtns>
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "about") {
    return (
      <div className="modal-header">
        <Logo>{localModalProperties.modalProperties.nameImg}</Logo>
        <MenuBtns>
          <MenuBtnsCloseBtn />
        </MenuBtns>
      </div>
    );
  }
}

export default ModalHeader;