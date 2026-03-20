import React, { Dispatch, SetStateAction } from 'react'
import { writeFile, mkdir, BaseDirectory } from '@tauri-apps/plugin-fs'
import { appDataDir } from '@tauri-apps/api/path'

import "./MenuItem.css"

//импортирование интерфейсов
import IDownloadedImage from '../../interfaces/IDownloadedImage'

// Определяем интерфейс пропсов
interface MenuItemProps {
	type: string,
	setDownloadedImagesUrls: Dispatch<SetStateAction<string[]>>,
	setDownloadedImagesThumbnails: Dispatch<SetStateAction<string[]>>,
	setDownloadedImages: Dispatch<SetStateAction<IDownloadedImage[]>>,
	children: React.ReactNode
}

// Путь к AppData/Roaming
const appDataDirPath = await appDataDir()

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

// Функция уменьшения изображения до 213px по высоте
async function resizeImage(file: File, maxHeight: number = 213): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const blobUrl = URL.createObjectURL(file)
		const img = new Image()

		img.onload = () => {
			// Вычисляем новую ширину с сохранением пропорций
			const ratio = maxHeight / img.height
			const newWidth = Math.round(img.width * ratio)
			const newHeight = maxHeight

			// Создаём canvas и уменьшаем изображение
			const canvas = document.createElement('canvas')
			canvas.width = newWidth
			canvas.height = newHeight

			const ctx = canvas.getContext('2d')
			if (!ctx) {
				reject(new Error('Cannot get canvas context'))
				return
			}

			// Качественное сглаживание
			ctx.imageSmoothingEnabled = true
			ctx.imageSmoothingQuality = 'high'
			ctx.drawImage(img, 0, 0, newWidth, newHeight)

			// Получаем blob из canvas
			canvas.toBlob(
				(blob) => {
					URL.revokeObjectURL(blobUrl)
					if (blob) {
						resolve(blob)
					} else {
						reject(new Error('Failed to create blob'))
					}
				},
				file.type,
				0.9 // качество JPEG
			)
		}

		img.onerror = () => {
			URL.revokeObjectURL(blobUrl)
			reject(new Error('Failed to load image'))
		}

		img.src = blobUrl
	})
}

const MenuItem = ({ type, setDownloadedImagesUrls, setDownloadedImagesThumbnails, setDownloadedImages, children }: MenuItemProps): React.JSX.Element => {

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
			const newImageThumbnailsUrls: string[] = []

			for (let i = 0; i < files.length; i++) {
				const file = files[i]

				// Читаем файл как ArrayBuffer
				const arrayBuffer = await file.arrayBuffer()
				const uint8Array = new Uint8Array(arrayBuffer)

				// Генерируем уникальное имя файла
				// const timestamp = Date.now()
				// const fileName = `${timestamp}_${file.name}`
				const fileName = file.name
				const filePath = `temp/images/${fileName}`
				console.log('filePath: ', filePath)

				// Сохраняем файл изображения на диск
				await writeFile(filePath, uint8Array, { baseDir: BaseDirectory.AppData })

				// Добавляем адрес миниатюры в массив
				const fullPath = appDataDirPath + "/" + filePath
				console.log('imgUrl: ', fileName)
				newImageUrls.push(fileName)

				// Уменьшаем изображение до 213px по высоте
				const resizedBlob = await resizeImage(file, 213)

				// Для отображения создаём blob URL
				const blobUrl = URL.createObjectURL(resizedBlob)
				// const blobUrl = URL.createObjectURL(file)
				newImageThumbnailsUrls.push(blobUrl)

				console.log('Сохранён файл:', filePath)
			}

			setDownloadedImagesUrls((prev) => [...prev, ...newImageUrls])
			setDownloadedImagesThumbnails((prev) => [...prev, ...newImageThumbnailsUrls])
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