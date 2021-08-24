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

  if (localModalProperties.modalProperties.type === "preview") {
    return (
      <div className="modal-container" onDoubleClick={dbClickHandler}>
        <ModalHeader />
        <ModalContent />
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "setPhotoTableData") {
    return (
      <div className="modal-container" >
        <ModalHeader name={'Данные фототаблицы'} />
        <ModalContent />
      </div>
    );
  }
}

export default ModalContainer;