//импортирование стилей
import './ModalCloseBtn.css'

interface ModalCloseBtnProps {
	handleClose: () => void
}

const ModalCloseBtn: React.FC<ModalCloseBtnProps> = ({ handleClose }): React.JSX.Element => {

  return <div className="modal-close-btn" onClick={handleClose}></div>;
};

export default ModalCloseBtn;