import React, { useContext } from 'react';
import Logo from '../header/Logo';
import Menu from '../header/Menu';
import MenuBtns from '../header/MenuBtns';
import MenuItem from '../header/MenuItem';
import MenuBtnsCheckBtn from '../header/MenuBtnsCheckBtn';
import MenuBtnsCloseBtn from '../header/MenuBtnsCloseBtn';
import { modalDataContext } from '../../App';
import './ModalHeader.css'

const ModalHeader = ({ name }) => {

  const localModalProperties = useContext(modalDataContext);

  if (localModalProperties.modalProperties.type === "preview") {
    return (
      <div className="modal-header">
        <Logo>{localModalProperties.modalProperties.nameImg}</Logo>
        <Menu>
          <MenuItem notActive={true}>Выделить область</MenuItem>
          <MenuItem notActive={true}>Обрезать</MenuItem>
          {/* <MenuItem notActive={true}>Удалить из списка</MenuItem> */}
        </Menu>
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

}

export default ModalHeader;