import React, { useContext } from 'react';
import { modalDataContext } from '../../App';

const ModalContentEmployeeItem = ({ name }) => {
  const localModalProperties = useContext(modalDataContext);

  function onClickHandler() {
    const tempArr = localModalProperties.settings.executors.filter(item => {
      if (item === name) return false;
      return true;
    })
    localModalProperties.setSettings(prev => { return { ...prev, executors: tempArr}})
  }

  return (
    <div className="modal-content-grid-settings-list-item">
      <div className="modal-content-grid-settings-list-item-name">{name}</div>
      <div className="modal-content-grid-settings-list-item-del-btn" onClick={onClickHandler}></div>
    </div>
  );
}
export default ModalContentEmployeeItem;