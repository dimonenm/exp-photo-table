import React from 'react';
import './ModalContent.css'

const ModalContent = ({ urlImg }) => {
    return (
        <div className="modal-content">
            <img src={urlImg} alt={'test'}></img>
        </div>
    );
}

export default ModalContent;