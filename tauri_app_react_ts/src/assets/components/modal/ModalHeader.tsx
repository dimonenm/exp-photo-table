//импортирование стилей
import './ModalHeader.css'

interface ModalHeaderProps {
	name: string
	handleClose: () => void
	handleSave: () => void
}

// Компонент заголовка модального окна
const ModalHeader: React.FC<ModalHeaderProps> = ({ name, handleClose, handleSave }) => {
	return (
		<div className='modal-header'>
			<div className='modal-header-title'>{name}</div>
			<button className='modal-header-save-btn' onClick={handleSave}>
				v
			</button>
			<button className='modal-header-close-btn' onClick={handleClose}>
				×
			</button>
		</div>
	)
}

export default ModalHeader