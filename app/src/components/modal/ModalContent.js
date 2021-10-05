import React, { useContext } from 'react';
import AvatarEditor from 'react-avatar-editor';
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
          placeholder="Укажите адрес проведения ОМП..."
          value={
            localModalProperties.photoTableData.adressOMP ?
              localModalProperties.photoTableData.adressOMP :
              ''}
        />
        <div className="modal-content-title">Дата:</div>
        <input
          type="date"
          className="dateOMP"
          onChange={changeDateOMPHandler}
          value={
            localModalProperties.photoTableData.dateOMP ?
              localModalProperties.photoTableData.dateOMP :
              ''}
        ></input>
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "setGalleryImageData") {

    const changeIllustrationDescriptionHandler = () => {
      const str = document.querySelector('.illustrationDescription');
      localModalProperties.setModalProperties((prev) => {
        return ({
          ...prev,
          textImg: str.value
        })
      })
    };

    return (
      <div className="modal-content-data">
        <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img>
        <div className="modal-content-title">Описание:</div>
        <textarea
          className="illustrationDescription"
          onChange={changeIllustrationDescriptionHandler}
          rows={5}
          placeholder="Введите описание для иллюстрации..."
          value={
            localModalProperties.modalProperties.textImg ?
              localModalProperties.modalProperties.textImg :
              ''}
        />
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "cutPhoto") {

    return (
      <div className="modal-content-data">
        <AvatarEditor
          image={localModalProperties.modalProperties.urlImg}
          width={800}
          height={600}
          border={0}
          color={[255, 255, 255, 0.8]} // RGBA
          scale={1.5}
          rotate={0}
        />
      </div>
    );
  }

}

export default ModalContent;