import { useContext } from 'react';
import { modalDataContext } from '../../App';
import './ModalContentPreview.scss';

const ModalContentPreview = () => {

  const localModalProperties = useContext(modalDataContext);

  return (
    <div className="modal-content-preview">
      <img src={localModalProperties.modalProperties.urlImg} alt={'test'}></img>
    </div>
  );
}
export default ModalContentPreview;