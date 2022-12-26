import React, { useState, useEffect, useContext } from 'react';
// import AvatarEditor from 'react-avatar-editor';
import ModalContentEmployeeItem from './ModalContentEmployeeItem';
import regexpCheckingComplianceInitialsSurname from '../../services/forModalContent/fRegexpCheckingComplianceInitialsSurname';
import ModalCanvas from './canvas/ModalCanvas';
import ModalContentPreview from './ModalContentPreview';
import { modalDataContext } from '../../App';
import './ModalContent.css'
import './ModalContentGrid.css'

const ModalContent = () => {

  const localModalProperties = useContext(modalDataContext);

  // const [editorData, setEditorData] = useState({
  //   width: 700,
  //   height: 525,
  //   zoom: 1
  // });
  const [canvas] = useState();
  // const [canvas, setCanvas] = useState();
  const [newEmployee, setNewEmployee] = useState('');

  function onClickSave() {

    fetch(canvas.getImage().toDataURL())
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);

        const tempGalleryImages = [...localModalProperties.galleryImages];
        tempGalleryImages[localModalProperties.modalProperties.indexImgInGallery].urlImg = url;
        localModalProperties.setGalleryImages(tempGalleryImages);
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
    return (<ModalContentPreview />);
    // return (
    //   <div className="modal-content">
    //     {/* <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img> */}
    //   </div>
    // );
  }
  if (localModalProperties.modalProperties.type === "setSettings") {
    const changeNoteHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, note: event.target.value }) }) }
    const changeUnitHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, unit: event.target.value }) }) }
    const changeNewEmployeeHandler = (event) => { setNewEmployee(event.target.value) }
    const clickNewEmployeeHandler = () => {
      if (newEmployee !== '' && regexpCheckingComplianceInitialsSurname(newEmployee)) {

        if (localModalProperties.settings.executors.find(item => item === newEmployee)) {
          console.log('Сотрудник уже добавлен');
          return;
        }

        localModalProperties.setSettings((prev) => {
          const arrNewExecutors = localModalProperties.settings.executors;
          arrNewExecutors.push(newEmployee);
          return ({ ...prev, executors: arrNewExecutors })
        })

        setNewEmployee('');
      } else {
        console.log('Сотрудник не добавлен');
      }
    }

    return (
      <div className="modal-content-grid">
        <div className="modal-content-grid-settings-container modal-content-grid-settings-note">
          <div className="modal-content-grid-settings-title">Примечание</div>
          <div className="modal-content-grid-settings-textarea">
            <textarea onChange={changeNoteHandler} value={localModalProperties.settings.note}></textarea>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-employee">
          <div className="modal-content-grid-settings-title">ФИО нового сотрудника</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeNewEmployeeHandler} value={newEmployee}></input>
            <div className="plus-btn" onClick={clickNewEmployeeHandler}></div>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-unit">
          <div className="modal-content-grid-settings-title">Отделение</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeUnitHandler} value={localModalProperties.settings.unit}></input>
          </div>
        </div>
        <div className="modal-content-grid-settings-employee-list">
          <div className="modal-content-grid-settings-title">Список сотрудников</div>
          <div className="modal-content-grid-settings-list">
            {localModalProperties.settings.executors.map((item, index) => {
              return (<ModalContentEmployeeItem key={index} name={item} />)
            })}
          </div>
        </div>
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
              value={
                localModalProperties.photoTableData.unit ?
                  localModalProperties.photoTableData.unit :
                  localModalProperties.settings.unit ?
                    localModalProperties.settings.unit :
                    ''}
            ></input>
          </div>
          <div className="modal-content-data-cell">
            <div className="modal-content-title">КУСП</div>
            <input
              type="text"
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
            >
              {localModalProperties.settings.executors ?
                localModalProperties.settings.executors.map((item, index) => { return (<option key={index} >{item}</option>) }) :
                <option >Данные отсутствуют</option>
              }
            </select>
          </div>
        </div>
      </div >
    );
  }

  if (localModalProperties.modalProperties.type === "editPhoto") {
    return (
      <ModalCanvas />
    );
  }

}

export default ModalContent;