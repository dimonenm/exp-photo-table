import React from 'react';
import Logo from '../header/Logo';
import Menu from '../header/Menu';
import MenuItem from '../header/MenuItem';
import './ModalHeader.css'

const ModalHeader = ({ nameImg }) => {
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

export default ModalHeader;