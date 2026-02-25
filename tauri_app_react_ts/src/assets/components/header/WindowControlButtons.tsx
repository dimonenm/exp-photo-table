import React from 'react'
import './WindowControlButtons.css'

const MyComponent: React.FC = () => {

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
		<div style={{ display: 'flex', position: 'absolute', right: '0px' }}>
			{/* Кастомный заголовок */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '30px',
					//WebkitAppRegion: 'drag', // Для electron-совместимости, если нужно, но Tauri использует data-атрибут
				}}
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

export default MyComponent