import React, { Dispatch, SetStateAction } from 'react'
import "./MenuItem.css"

// Определяем интерфейс пропсов
interface MenuItemProps {
	type: string,
	setDownloadedImages: Dispatch<SetStateAction<undefined>>,
	children: React.ReactNode
}

function selectButtonType(type: string): string {
	switch (type) {
		case 'menu-item download-photo-files':
			return 'download-photo-files'
		default:
			return 'menu-item'
	}
}

const MenuItem = ({ type, setDownloadedImages, children }: MenuItemProps): React.JSX.Element => {

	const buttonType = selectButtonType(type)




	return (
		<div className={buttonType}>
			<input type="file" className="file" multiple={true} accept="image/*"></input>
			<a href="/" onClick={loadImgs}>{children}</a>
		</div>
	)
}

export default MenuItem