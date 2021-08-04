import React, { useContext } from 'react';
import LighteningBackground from '../components/modal/LighteningBackground';
import ModalContainer from '../components/modal/ModalContainer';
import { modalDataContext } from '../App';
import './Modal.css';

const Modal = () => {
    const localModalProperties = useContext(modalDataContext);
    if (localModalProperties.modalProperties.isOpen) {
        return (
            <>
                <LighteningBackground />
                <ModalContainer />
            </>
        );
    }
    return null;
}

export default Modal;