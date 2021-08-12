import React from 'react';
import Logo from '../header/Logo';
import Menu from '../header/Menu';
import MenuBtns from '../header/MenuBtns';
import MenuItem from '../header/MenuItem';
import MenuBtnsCheckBtn from '../header/MenuBtnsCheckBtn';
import MenuBtnsCloseBtn from '../header/MenuBtnsCloseBtn';
import './ModalHeader.css'

const ModalHeader = ({ nameImg, name }) => {

    if (nameImg) {
        return (
            <div className="modal-header">
                <Logo>{nameImg}</Logo>
                <Menu>
                    <MenuItem notActive={true}>Выделить область</MenuItem>
                    <MenuItem notActive={true}>Обрезать</MenuItem>
                    {/* <MenuItem notActive={true}>Удалить из списка</MenuItem> */}
                </Menu>
            </div>
        );
    }
    if (name) {
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