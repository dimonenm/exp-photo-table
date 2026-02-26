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

	// Базовый стиль для кнопок
	const buttonStyle: React.CSSProperties = {
		background: 'transparent',
		border: 'none',
		color: 'white',
		fontSize: '16px',
		width: '46px',
		height: '30px',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'background 0.2s',
	}

	return (
		<div className='windowControlButtons' 
		// style={{ display: 'flex', position: 'absolute', right: '0px' }}
		>
			{/* Кастомный заголовок */}
			<div
			className='windowControlButtons_title'
				// style={{
				// 	display: 'flex',
				// 	justifyContent: 'space-between',
				// 	alignItems: 'center',
				// 	height: '30px',
				// 	//WebkitAppRegion: 'drag', // Для electron-совместимости, если нужно, но Tauri использует data-атрибут
				// }}
				data-tauri-drag-region
			>
				{/* Кнопки управления */}
				<div style={{ display: 'flex' }}>
					<button
						onClick={handleMinimize}
						style={buttonStyle}
						onMouseEnter={(e) => e.currentTarget.style.background = '#ffffff20'}
						onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
					>
						&#9472; {/* Минус */}
					</button>

					<button
						onClick={handleMaximize}
						style={buttonStyle}
						onMouseEnter={(e) => e.currentTarget.style.background = '#ffffff20'}
						onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
					>
						&#9723; {/* Квадрат */}
					</button>

					<button
						onClick={handleClose}
						style={buttonStyle}
						onMouseEnter={(e) => e.currentTarget.style.background = '#e81123'}
						onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
					>
						&#10005; {/* Крестик */}
					</button>
				</div>
			</div>
		</div>
	)
}

export default WindowControlButtons