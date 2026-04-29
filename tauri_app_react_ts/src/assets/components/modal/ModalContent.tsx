import {Dispatch, SetStateAction} from 'react'
import IPhotoTableData from '../../interfaces/IPhotoTableData'

//импортирование стилей
import './ModalContent.css'

interface ModalContentProps {
	photoTableData: IPhotoTableData
	setPhotoTableData: Dispatch<SetStateAction<IPhotoTableData>>
	handleClose: () => void
}

// Компонент контента модального окна

const ModalContent: React.FC<ModalContentProps> = ({
  photoTableData,
  setPhotoTableData,
  handleClose,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setPhotoTableData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='modal-content'>
      <form className='modal-form'>
        <div className='form-group'>
          <label htmlFor='numbOMP'>№ ОМП:</label>
          <input
            type='text'
            id='numbOMP'
            name='numbOMP'
            value={photoTableData.numbOMP || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='factOMP'>Факт. ОМП:</label>
          <input
            type='text'
            id='factOMP'
            name='factOMP'
            value={photoTableData.factOMP || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='adressOMP'>Адрес ОМП:</label>
          <input
            type='text'
            id='adressOMP'
            name='adressOMP'
            value={photoTableData.adressOMP || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='dateOMP'>Дата ОМП:</label>
          <input
            type='date'
            id='dateOMP'
            name='dateOMP'
            value={photoTableData.dateOMP || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='dateForDoc'>Дата для документа:</label>
          <input
            type='date'
            id='dateForDoc'
            name='dateForDoc'
            value={photoTableData.dateForDoc || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='unit'>Подразделение:</label>
          <input
            type='text'
            id='unit'
            name='unit'
            value={photoTableData.unit || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='kusp'>КУСП:</label>
          <input
            type='text'
            id='kusp'
            name='kusp'
            value={photoTableData.kusp || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='executor'>Исполнитель:</label>
          <input
            type='text'
            id='executor'
            name='executor'
            value={photoTableData.executor || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className='modal-buttons'>
          <button type='button' className='btn-close' onClick={handleClose}>
            Закрыть
          </button>
        </div>
      </form>
    </div>
  )
}

export default ModalContent