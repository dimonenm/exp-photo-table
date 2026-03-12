import React, { Dispatch, SetStateAction } from 'react'
import "./MenuItem.css"

// Определяем интерфейс пропсов
interface MenuItemProps {
	type: string,
	setDownloadedImages: Dispatch<SetStateAction<string[]>>,
	children: React.ReactNode
}

function selectButtonStyle(type: string): string {
	switch (type) {
		case 'menu-item download-photo-files':
			return 'download-photo-files'
		default:
			return 'menu-item'
	}
}

const MenuItem = ({ type, setDownloadedImages, children }: MenuItemProps): React.JSX.Element => {

	const loadImgs = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		// Создаём скрытый input и кликаем по нему
		const input = document.createElement('input')
		input.type = 'file'
		input.multiple = true
		input.accept = 'image/*'

		input.onchange = (event) => {
			const files = (event.target as HTMLInputElement).files

			console.log('files: ', files);
			
			if (!files) return

			const readers: Promise<string>[] = []

			for (let i = 0; i < files.length; i++) {
				const file = files[i]
				const reader = new Promise<string>((resolve) => {
					const reader = new FileReader()
					reader.onload = (e) => resolve(e.target?.result as string)
					reader.readAsDataURL(file)
				})
				readers.push(reader)
			}

			Promise.all(readers).then((images) => {
				setDownloadedImages((prev) => [...prev, ...images])
			})
		}

		input.click()
	}

	const buttonStyle = selectButtonStyle(type)

	return (
		<div className={buttonStyle}>
			<input type="file" className="file" multiple={true} accept="image/*"></input>
			<a href="/" onClick={loadImgs}>{children}</a>
		</div>
	)
}

export default MenuItem