import React from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import './WindowControlButtons.css'

const WindowControlButtons = (): React.JSX.Element => {
	const appWindow = getCurrentWindow()

	const handleMinimize = () => {
		appWindow.minimize()
	}

	const handleMaximize = () => {
		appWindow.toggleMaximize() // Переключает режим развернуто/свернуто
	}

	const handleClose = () => {
		appWindow.close()
	}

	return (
		<div className='windowControlButtons'>
			<div
				className='windowControlButtons_title'
				data-tauri-drag-region
			>
				{/* Кнопки управления */}
				<div style={{ display: 'flex' }}>
					<button
						onClick={handleMinimize}
						className='windowControlButtons_button'
					>
						&#9472; {/* Минус */}
					</button>

					<button
						onClick={handleMaximize}
						className='windowControlButtons_button'
					>
						&#9723; {/* Квадрат */}
					</button>

					<button
						onClick={handleClose}
						className='windowControlButtons_button close'
					>
						&#10005; {/* Крестик */}
					</button>
				</div>
			</div>
		</div>
	)
}

export default WindowControlButtons