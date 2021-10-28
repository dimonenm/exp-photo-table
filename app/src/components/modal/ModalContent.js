import React, { useState, useEffect, useContext } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { modalDataContext } from '../../App';
import './ModalContent.css'

const ModalContent = () => {

  const localModalProperties = useContext(modalDataContext);

  const [editorData, setEditorData] = useState({
    width: 700,
    height: 525,
    zoom: 1
  });

  const [canvas, setCanvas] = useState();

  function onClickSave() {

    fetch(canvas.getImage().toDataURL())
      .then(res => res.blob())
      .then(blob => {
        // console.log(URL.createObjectURL(blob));

        const url = URL.createObjectURL(blob);

        const tempGalleryImages = [...localModalProperties.galleryImages];
        tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].urlImg = url;
        localModalProperties.setGalleryImages(tempGalleryImages);
        // console.log(localModalProperties.modalProperties.urlImg);
        localModalProperties.setModalProperties((prev) => {
          return {
            ...prev,
            urlImg: url
          }
        });
      });

    localModalProperties.setModalProperties((prev) => {
      return {
        ...prev,
        type: "setGalleryImageData",
        cut: false
      }
    })
  }

  useEffect(() => {
    if (localModalProperties.modalProperties.cut) {
      onClickSave();
    }
  })

  if (localModalProperties.modalProperties.type === "preview") {
    return (
      <div className="modal-content">
        <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img>
      </div>
    );
  }

  if (localModalProperties.modalProperties.type === "setPhotoTableData") {

    const changeNumbOMPHandler = () => {
      const str = document.querySelector('.numbOMP');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          numbOMP: str.value
        })
      })
    };
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
      const date = new Date(str.value)

      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          dateOMP: str.value,
          dateForDoc: `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.${(date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`
        })
      })
    };
    const changeUnitHandler = () => {
      const str = document.querySelector('.unit');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          unit: str.value
        })
      })
    };
    const changeKuspHandler = () => {
      const str = document.querySelector('.kusp');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          kusp: str.value
        })
      })
    };
    const changeExecutorHandler = () => {
      const str = document.querySelector('.executor');
      localModalProperties.setphotoTableData((prev) => {
        return ({
          ...prev,
          executor: str.value
        })
      })
    };

    return (
      <div className="modal-content-data">
        <div className="modal-content-data-row">
          <div className="modal-content-data-cell">
            <div className="modal-content-title">№ по журналу ОМП</div>
            <input
              type="number"
              className="numbOMP"
              onChange={changeNumbOMPHandler}
              value={localModalProperties.photoTableData.numbOMP ?
                localModalProperties.photoTableData.numbOMP :
                ''}
            ></input>
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">Факт проведения ОМП:</div>
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
          </div>
          <div className="modal-content-data-cell">
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
          </div>
        </div>
        <div className="modal-content-data-row">
          <div className="modal-content-data-cell">
            <div className="modal-content-title">Дата фототаблицы:</div>
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
          <div className="modal-content-data-cell">
            <div className="modal-content-title">Отделение</div>
            <input
              type="text"
              className="unit"
              onChange={changeUnitHandler}
              value="Симферопольский"
            ></input>
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">КУСП</div>
            <input
              type="number"
              className="kusp"
              onChange={changeKuspHandler}
              value={
                localModalProperties.photoTableData.kusp ?
                  localModalProperties.photoTableData.kusp :
                  ''}
            ></input>
          </div>
        </div>
        <div className="modal-content-data-row">
          <div className="modal-content-data-cell">
            <div className="modal-content-title">Исполнитель</div>
            <select
              className="executor"
              onChange={changeExecutorHandler}
              value={
                localModalProperties.photoTableData.executor ?
                  localModalProperties.photoTableData.executor :
                  ''}
            >
              <option>Ежель Д.С.</option>
              <option>Атнагулов Д.Б.</option>
              <option>Горбенко А.В.</option>
              <option>Дубовой С.В.</option>
            </select>
          </div>
        </div>
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
    const inputChangeHandler = (event) => {
      setEditorData((prev) => {
        return { ...prev, zoom: +event.target.value }
      });
    }
    const orientationVerticalClickHandler = () => {
      const tempGalleryImages = [...localModalProperties.galleryImages];
      tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].orientation = 'vertical';
      localModalProperties.setGalleryImages(tempGalleryImages);

      setEditorData((prev) => {
        return { ...prev, width: 393, height: 525 }
      });
    }
    const orientationHorizontalClickHandler = () => {
      const tempGalleryImages = [...localModalProperties.galleryImages];
      tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].orientation = 'horizontal';
      localModalProperties.setGalleryImages(tempGalleryImages);

      setEditorData((prev) => {
        return { ...prev, width: 700, height: 525 }
      });
    }

    const setEditorRef = (editor) => {
      setCanvas(editor);
      // canvas = editor;
    };

    return (
      <div className="modal-content-data">
        <AvatarEditor
          ref={setEditorRef}
          image={localModalProperties.modalProperties.urlImg}
          width={editorData.width}
          height={editorData.height}
          border={0}
          color={[255, 255, 255, 0.8]} // RGBA
          scale={editorData.zoom}
          rotate={0}
        />
        <div className="modal-content-data-controls">
          <div className="modal-content-data-controls-orientation">
            <div className="modal-content-data-controls-orientation-title">Ориентация:</div>
            <div
              className="modal-content-data-controls-orientation-vertical"
              onClick={orientationVerticalClickHandler}
            >Вертикальная</div>
            <div
              className="modal-content-data-controls-orientation-horizontal"
              onClick={orientationHorizontalClickHandler}
            >Горизонтальная</div>
          </div>
          <div className="modal-content-data-controls-zoom">
            <div className="modal-content-data-controls-zoom-title">Увеличение:</div>
            <div className="modal-content-data-controls-zoom-range">
              <input
                type="range"
                step="0.1"
                min="1"
                max="2"
                value={editorData.zoom}
                onChange={inputChangeHandler}
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ModalContent;