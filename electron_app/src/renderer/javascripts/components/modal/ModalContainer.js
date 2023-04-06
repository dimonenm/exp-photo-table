import React, { useContext, useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import { modalDataContext } from '../../App';

const ModalContainer = () => {
  const [imgDescState, setImgDescState] = useState(null)
  const [arrowDescState, setArrowDescState] = useState([])


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
      <div className="modal-container-preview fadeIn" onDoubleClick={dbClickHandler}>
        <ModalHeader />
        <ModalContent />
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "setPhotoTableData") {
    return (
      <div className="modal-container slideDownIn" >
        <ModalHeader name={'Данные фототаблицы'} />
        <ModalContent />
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "editPhoto") {
    return (
      <div className={'modal-container fadeIn'}>
        <ModalHeader name={'Редактирование иллюстрации'}
          imgDescState={imgDescState}
          arrowDescState={arrowDescState}
        />
        <ModalContent
          setImgDescState={setImgDescState}
          imgDescState={imgDescState}
          arrowDescState={arrowDescState}
          setArrowDescState={setArrowDescState} />
      </div>
    )
  }
  if (localModalProperties.modalProperties.type === "setSettings") {
    return (
      <div className="modal-container slideDownIn" >
        <ModalHeader name={'Настройки'} />
        <ModalContent />
      </div>
    );
  }
  if (localModalProperties.modalProperties.type === "about") {
    return (
      <div className="modal-container slideDownIn" >
        <ModalHeader name={'О программе'} />
        <ModalContent />
      </div>
    );
  }
}


export default ModalContainer;