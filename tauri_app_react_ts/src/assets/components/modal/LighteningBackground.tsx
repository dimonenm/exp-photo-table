//импортирование стилей
import './LighteningBackground.css'

interface LighteningBackgroundProps {
  handleClose: () => void
}

// Компонент затемнённого фона
const LighteningBackground: React.FC<LighteningBackgroundProps> = ({
	handleClose,
}) => {
	return <div className='lightening-background' onClick={handleClose} />
}

export default LighteningBackground