import React, { Dispatch, SetStateAction } from 'react'
import './Modal.css'

//импортирование интерфейсов
import IModalProperties from '../../interfaces/IModalProperties'
import IPhotoTableData from '../../interfaces/IPhotoTableData'

interface ModalProps {
  modalProperties: IModalProperties
  setModalProperties: Dispatch<SetStateAction<IModalProperties>>
  photoTableData: IPhotoTableData
  setPhotoTableData: Dispatch<SetStateAction<IPhotoTableData>>
}

//импортирование компонентов
import ModalContainer from './ModalContainer'
import LighteningBackground from './LighteningBackground'




const Modal: React.FC<ModalProps> = ({
  modalProperties,
  setModalProperties,
  photoTableData,
  setPhotoTableData,
}): React.JSX.Element | null => {
  const handleClose = (): void => {
    setModalProperties({
      isOpen: false,
      type: null,
    })
  }

  if (modalProperties.isOpen) {
    return (
      <>
        <div className='modal'>
          <LighteningBackground handleClose={handleClose} />
          <ModalContainer
            modalProperties={modalProperties}
            photoTableData={photoTableData}
            setPhotoTableData={setPhotoTableData}
            handleClose={handleClose}
          />
        </div>
      </>
    )
  }
  return null
}





export default Modal
