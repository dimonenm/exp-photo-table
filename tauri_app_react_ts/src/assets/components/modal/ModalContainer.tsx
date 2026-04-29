import {Dispatch, SetStateAction} from 'react'

//импортирование интерфейсов
import IPhotoTableData from '../../interfaces/IPhotoTableData'
import IModalProperties from '../../interfaces/IModalProperties'

//импортирование компонентов
import ModalHeader from './ModalHeader'
import ModalContent from './ModalContent'

//импортирование стилей
import './ModalContainer.css'

interface ModalContainerProps {
	modalProperties: IModalProperties
	photoTableData: IPhotoTableData
	setPhotoTableData: Dispatch<SetStateAction<IPhotoTableData>>
	handleClose: () => void
}

// Компонент контейнера модального окна
const ModalContainer: React.FC<ModalContainerProps> = ({
  modalProperties,
  photoTableData,
  setPhotoTableData,
  handleClose,
}) => {
  const renderContent = (): React.JSX.Element | null => {
    switch (modalProperties.type) {
      case 'photoTableData':
        return (
          <div className='modal-container slideDownIn'>
            <ModalHeader name='Данные фототаблицы' handleClose={handleClose} />
            <ModalContent
              photoTableData={photoTableData}
              setPhotoTableData={setPhotoTableData}
              handleClose={handleClose}
            />
          </div>
        )
      default:
        return null
    }
  }

  return renderContent()
}

export default ModalContainer