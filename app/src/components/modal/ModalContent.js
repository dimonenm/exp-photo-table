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

    const changeFactOMPHandler = () => {
      const str = document.querySelector('.factOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          factOMP: str.value
        })
      })
    };
    const changeAdressOMPHandler = () => {
      const str = document.querySelector('.adressOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          adressOMP: str.value
        })
      })
    };
    const changeDateOMPHandler = () => {
      const str = document.querySelector('.dateOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          dateOMP: str.value
        })
      })
    };

    console.log(localModalProperties.photoTableData);
    // photoTableData, setphotoTableData

    return (
      <div className="modal-content-data">
        <div className="modal-content-title">ОМП по факту:</div>
        <textarea
          className="factOMP"
          onChange={changeFactOMPHandler}
          rows={3}
          placeholder="Укажите факт проведения ОМП..."
          value={
            localModalProperties.photoTableData.factOMP ?
              localModalProperties.photoTableData.factOMP :
              ''}
        />
        <div className="modal-content-title">Адрес проведения ОМП:</div>
        <textarea
          className="adressOMP"
          onChange={changeAdressOMPHandler}
          rows={3}
          placeholder="Укажите адрес проведения ОМП..." />
        <div className="modal-content-title">Дата:</div>
        <input type="date" className="dateOMP" onChange={changeDateOMPHandler}></input>
        <div></div>
      </div>
    );
  }

}

export default ModalContent;