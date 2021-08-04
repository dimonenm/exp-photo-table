import React, { useContext } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import { modalDataContext } from '../../App';
import './ModalContainer.css';

const ModalContainer = () => {
    const localModalProperties = useContext(modalDataContext);
    return (
        <div className="modal-container">
            <ModalHeader
                nameImg={localModalProperties.modalProperties.nameImg}
            />
            <ModalContent
                urlImg={localModalProperties.modalProperties.urlImg}
            />
        </div>
    );
}

export default ModalContainer;