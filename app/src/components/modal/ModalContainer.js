import React, { useContext } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import { modalDataContext } from '../../App';
import './ModalContainer.css';

const ModalContainer = () => {
    const localModalProperties = useContext(modalDataContext);

    function dbClickHandler() {
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
        <div className="modal-container" onDoubleClick={dbClickHandler}>
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