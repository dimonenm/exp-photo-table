import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import './Modal.css'

//импортирование интерфейсов
import IModalProperties from '../interfaces/IModalProperties'
import IPhotoTableData from '../interfaces/IPhotoTableData'

interface ModalProps {
	modalProperties: IModalProperties
	setModalProperties: Dispatch<SetStateAction<IModalProperties>>
	photoTableData: IPhotoTableData
	setPhotoTableData: Dispatch<SetStateAction<IPhotoTableData>>
}

const Modal: React.FC<ModalProps> = ({
	modalProperties,
	setModalProperties,
	photoTableData,
	setPhotoTableData
}): React.JSX.Element | null => {

	const handleClose = (): void => {
		setModalProperties({ isOpen: false, type: null })
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.target === e.currentTarget) {
			handleClose()
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setPhotoTableData(prev => ({
			...prev,
			[name]: value
		}))
	}

	if (!modalProperties.isOpen) {
		return null
	}

	const renderContent = (): React.JSX.Element | null => {
		switch (modalProperties.type) {
			case 'photoTableData':
				return (
					<div className="modal-content">
						<h2>Данные фототаблицы</h2>
						<form className="modal-form">
							<div className="form-group">
								<label htmlFor="numbOMP">№ ОМП:</label>
								<input
									type="text"
									id="numbOMP"
									name="numbOMP"
									value={photoTableData.numbOMP || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="factOMP">Факт. ОМП:</label>
								<input
									type="text"
									id="factOMP"
									name="factOMP"
									value={photoTableData.factOMP || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="adressOMP">Адрес ОМП:</label>
								<input
									type="text"
									id="adressOMP"
									name="adressOMP"
									value={photoTableData.adressOMP || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="dateOMP">Дата ОМП:</label>
								<input
									type="date"
									id="dateOMP"
									name="dateOMP"
									value={photoTableData.dateOMP || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="dateForDoc">Дата для документа:</label>
								<input
									type="date"
									id="dateForDoc"
									name="dateForDoc"
									value={photoTableData.dateForDoc || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="unit">Подразделение:</label>
								<input
									type="text"
									id="unit"
									name="unit"
									value={photoTableData.unit || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="kusp">КУСП:</label>
								<input
									type="text"
									id="kusp"
									name="kusp"
									value={photoTableData.kusp || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="executor">Исполнитель:</label>
								<input
									type="text"
									id="executor"
									name="executor"
									value={photoTableData.executor || ''}
									onChange={handleInputChange}
								/>
							</div>
							<div className="modal-buttons">
								<button type="button" className="btn-close" onClick={handleClose}>
									Закрыть
								</button>
							</div>
						</form>
					</div>
				)
			default:
				return null
		}
	}

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			{renderContent()}
		</div>
	)
}

export default Modal