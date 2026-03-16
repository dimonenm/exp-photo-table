import React, { Dispatch, SetStateAction } from 'react'
import { writeFile, mkdir, BaseDirectory } from '@tauri-apps/plugin-fs'
import { appCacheDir } from '@tauri-apps/api/path'
import "./MenuItem.css"



// Определяем интерфейс пропсов
interface MenuItemProps {
	type: string,
	setDownloadedImages: Dispatch<SetStateAction<string[]>>,
	setDownloadedImagesUrls: Dispatch<SetStateAction<string[]>>,
	children: React.ReactNode
}

// Получаем путь к кэшу
const appCacheDirPath = await appCacheDir()

function selectButtonStyle(type: string): string {
	switch (type) {
		case 'menu-item download-photo-files':
			return 'download-photo-files'
		default:
			return 'menu-item'
	}
}

async function convertToBase64(files: FileList): Promise<string[]> {
	const readers = Array.from(files).map(
		(file) =>
			new Promise<string>((resolve) => {
				const reader = new FileReader()
				reader.onload = () => resolve(reader.result as string)
				reader.readAsDataURL(file)
			})
	)

	return await Promise.all(readers)
}

const MenuItem = ({ type, setDownloadedImages, children }: MenuItemProps): React.JSX.Element => {

	const loadImgs = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()

		// Создаём скрытый input и кликаем по нему
		const input = document.createElement('input')
		input.type = 'file'
		input.multiple = true
		input.accept = 'image/*'

		input.onchange = async (event) => {
			const files = (event.target as HTMLInputElement).files

			if (!files) return

			// Создаём папку, если её нет
			try {
				await mkdir('temp/images', { baseDir: BaseDirectory.AppData, recursive: true })
			} catch (e) {
				// Папка уже существует - игнорируем ошибку
				console.log('Папка уже существует')
			}

			const newImageUrls: string[] = []

			for (let i = 0; i < files.length; i++) {
				const file = files[i]

				// Читаем файл как ArrayBuffer
				const arrayBuffer = await file.arrayBuffer()
				const uint8Array = new Uint8Array(arrayBuffer)

				// Генерируем уникальное имя файла
				const timestamp = Date.now()
				const fileName = `${timestamp}_${file.name}`
				const filePath = `temp/images/${fileName}`

				// Сохраняем файл на диск
				await writeFile(filePath, uint8Array, { baseDir: BaseDirectory.AppData })
				console.log(`file url: ${appCacheDirPath}/${filePath}`)

				// Для отображения создаём blob URL
				const blobUrl = URL.createObjectURL(file)
				newImageUrls.push(blobUrl)


				// Получаем blob по URL(недокументированный способ)
				const response = await fetch(blobUrl)
				const blob = await response.blob()

				console.log(`${blob.size / 1024 / 1024}`)  // размер
				console.log(blob.type)  // MIME-тип

				// Преобразовать в Data URL для просмотра
				// const reader = new FileReader()
				// reader.onload = () => console.log(reader.result)
				// reader.readAsDataURL(blob)


				console.log('Сохранён файл:', filePath)
			}

			setDownloadedImages((prev) => [...prev, ...newImageUrls])
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