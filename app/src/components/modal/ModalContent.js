import React, { useContext } from 'react';
import { modalDataContext } from '../../App';
import './ModalContent.css'

const ModalContent = () => {

  const localModalProperties = useContext(modalDataContext);

  if (localModalProperties.modalProperties.type === "preview") {
    return (
      <div className="modal-content">
        <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img>
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "setPhotoTableData") {
    return (
      <div className="modal-content">
        
      </div>
    );
  }

}

export default ModalContent;