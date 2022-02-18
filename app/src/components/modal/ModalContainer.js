import React, { useContext } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import { modalDataContext } from '../../App';
import './ModalContainer.scss';

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
      <div className="modal-container set-photo-table-data" >
        <ModalHeader name={'Данные фототаблицы'} />
        <ModalContent />
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "setGalleryImageData") {
    return (
      <div className="modal-container" >
        <ModalHeader name={'Данные иллюстрации'} />
        <ModalContent />
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "cutPhoto") {
    return (
      <div className="modal-container" >
        <ModalHeader name={'Обрезка иллюстрации'} />
        <ModalContent />
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "editPhoto") {
    return (
      <div className={'modal-container'}>
        <ModalHeader name={'Редактирование иллюстрации'} />
        <ModalContent />
      </div>
    )
  }
  if (localModalProperties.modalProperties.type === "setSettings") {
    return (
      <div className="modal-container" >
        <ModalHeader name={'Настройки'} />
        <ModalContent />
      </div>
    );
  }
}

export default ModalContainer;