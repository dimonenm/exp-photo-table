import React, {useContext, useRef } from 'react';
import ModalContentEmployeeItem from './ModalContentEmployeeItem';
import ModalCanvas from './canvas/ModalCanvas';
import ModalContentPreview from './ModalContentPreview';
import { modalDataContext } from '../../App';

const ModalContent = ({ imgDescState, setImgDescState }) => {

  const localModalProperties = useContext(modalDataContext);

  const inputRef = useRef()
  if (localModalProperties.modalProperties.type === "preview") {
    return (<ModalContentPreview />);
  }
  if (localModalProperties.modalProperties.type === "setSettings") {    
    const changeNoteHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, note: event.target.value }) }) }
    const changeUnitHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, unit: event.target.value }) }) }
    const changeZipCodeHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, zip_code: event.target.value }) }) }
    const changeTelHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, tel: event.target.value }) }) }
    const changeAddressHandler = (event) => { localModalProperties.setSettings((prev) => { return ({ ...prev, address: event.target.value }) }) }
    const clickNewEmployeeHandler = () => {
  
      if (inputRef.current.value !== '') {

        if (localModalProperties.settings.executors.find(item => item === inputRef.current.value)) {
          console.log('Сотрудник уже добавлен');
          return;
        }
        const newEmployeeName = inputRef.current.value
        localModalProperties.setSettings((prev) => {
          const arrNewExecutors = localModalProperties.settings.executors;
          arrNewExecutors.push(newEmployeeName);
          return ({ ...prev, executors: arrNewExecutors })
        })
        
      } else {
        console.log('Сотрудник не добавлен');
      }
      inputRef.current.value = ''
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
            <input type="text"  ref={inputRef}></input>
            <div className="plus-btn" onClick={clickNewEmployeeHandler}></div>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-unit">
          <div className="modal-content-grid-settings-title">Отделение</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeUnitHandler} value={localModalProperties.settings.unit}></input>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-zip">
          <div className="modal-content-grid-settings-title">Почтовый индекс</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeZipCodeHandler} value={localModalProperties.settings.zip_code}></input>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-adres">
          <div className="modal-content-grid-settings-title">Адрес</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeAddressHandler} value={localModalProperties.settings.address}></input>
          </div>
        </div>
        <div className="modal-content-grid-settings-container modal-content-grid-settings-tel">
          <div className="modal-content-grid-settings-title">Телефон</div>
          <div className="modal-content-grid-settings-input">
            <input type="text" onChange={changeTelHandler} value={localModalProperties.settings.tel}></input>
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
              type="text"
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
      <ModalCanvas
        setImgDescState={setImgDescState}
        imgDescState={imgDescState}/>
    );
  }
  if (localModalProperties.modalProperties.type === "about") {
    return (
      <div className="modal-content-grid-about">
        <div className='modal-content-grid-about-title'>МИНИСТЕРСТВО ВНУТРЕННИХ ДЕЛ ПО РЕСПУБЛИКЕ КРЫМ</div>
        <div className='modal-content-grid-about-title'>ЭКСПЕРТНО-КРИМИНАЛИСТИЧЕСКИЙ ЦЕНТР</div>
        <div className='modal-content-grid-about-subTitle'>295048, г. Симферополь, ул. Балаклавская, д.68     тел. (3652)733-725</div>
        <div className='modal-content-grid-about-separator'></div>
        <div className='modal-content-grid-about-role'>Руководитель проекта</div>
        <div className='modal-content-grid-about-post'>Заместитель начальника ЭКЦ МВД по Республике Крым</div>
        <div className='modal-content-grid-about-name'><span>полковник полиции</span><span>Орленко Юрий Павлович</span></div>
        <div className='modal-content-grid-about-separator'></div>
        <div className='modal-content-grid-about-role'>Разработчик</div>
        <div className='modal-content-grid-about-contactsTitle'>Контакты</div>
        <div className='modal-content-grid-about-post'>Старший эксперт отдела криминалистических экспертиз ЭКЦ по Республике Крым</div>
        <div className='modal-content-grid-about-contacts'>
          <span>тел.: +7(978)713-27-28</span>
          <span>email: arzuakov@yahoo.com</span>
        </div>
        <div className='modal-content-grid-about-name'><span>майор полиции</span><span>Арзяков Дмитрий Николаевич</span></div>
        <div className='modal-content-grid-about-separator'></div>
        <div className='modal-content-grid-about-role'>Разработчик</div>
        <div className='modal-content-grid-about-contactsTitle'>Контакты</div>
        <div className='modal-content-grid-about-post'>Старший эксперт отдела криминалистических экспертиз ЭКЦ по Республике Крым</div>
        <div className='modal-content-grid-about-contacts'>
          <span>тел.: +7(978)845-51-69</span>
          <span>email: russs.khalilov@gmail.com</span>
        </div>
        <div className='modal-content-grid-about-name'><span>капитан полиции</span><span>Халилов Руслан Нариманович</span></div>
      </div>
    );
  }
}

export default ModalContent;