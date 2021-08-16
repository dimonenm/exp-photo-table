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
    console.log('setPhotoTableData');
    return (
      <div className="modal-content-data">
        <div className="modal-content-title">ОМП по факту:</div>
        <textarea name="name1" rows={3} placeholder="Укажите факт проведения ОМП..."/>
        <div className="modal-content-title">Адрес проведения ОМП:</div>
        <div className="modal-content-title">Дата:</div>
        <div></div>
      </div>
    );
  }

}

export default ModalContent;