//импортирование компонентов
import ModalCloseBtn from './ModalCloseBtn'
//импортирование стилей
import './ModalHeader.css'

interface ModalHeaderProps {
	name: string
	handleClose: () => void
}

// Компонент заголовка модального окна
const ModalHeader: React.FC<ModalHeaderProps> = ({ name, handleClose }) => {
	return (
		<div className='modal-header'>
			<div className='modal-header-title'>{name}</div>
			<ModalCloseBtn handleClose={handleClose} />
		</div>
	)
}

export default ModalHeader