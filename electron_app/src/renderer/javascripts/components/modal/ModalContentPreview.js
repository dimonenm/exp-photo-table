import React, { useContext } from 'react';
import { modalDataContext } from '../../App';

const ModalContentPreview = () => {

  const localModalProperties = useContext(modalDataContext);

  return (
    <div className="modal-content-preview">
      <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img>
    </div>
  );
}
export default ModalContentPreview;