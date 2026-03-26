import React, { Dispatch, SetStateAction } from 'react'
import { writeFile, mkdir, exists, BaseDirectory } from '@tauri-apps/plugin-fs'
import { appDataDir } from '@tauri-apps/api/path'

import "./MenuItem.css"

//импортирование интерфейсов
import IDownloadedImage from '../../interfaces/IDownloadedImage'

// Определяем интерфейс пропсов
interface MenuItemProps {
	type: string,
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

function uint8ArrayToBase64(bytes: Uint8Array): string {
	const blob = new Blob([new Uint8Array(bytes)])
	const reader = new FileReader()

	return new Promise((resolve) => {
		reader.onload = () => {
			const result = reader.result as string
			resolve(result)
		}
		reader.readAsDataURL(blob)
	}) as unknown as string
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

			const dirExists = await exists('temp/images', { baseDir: BaseDirectory.AppData })
			// Создаём папку, если её нет
			if (!dirExists) {
				try {
					await mkdir('temp/images', { baseDir: BaseDirectory.AppData, recursive: true })
				} catch (e) {
					console.log('Не удалось создать директорию по адресу temp/images')
					console.log('Возникла ошибка:', e)
				}
			} else {
				console.log('Директория temp/images уже существует')
			}

			const newImages: IDownloadedImage[] = []

			for (let i = 0; i < files.length; i++) {

				// Современный стандарт (ES2022) генерации id
				const id: string = crypto.randomUUID()

				let tempFileUrl: string = ''
				let thumbnailBlobUrl: string = ''

				const file = files[i]

				// Читаем файл как ArrayBuffer
				const arrayBuffer = await file.arrayBuffer()
				const uint8Array = new Uint8Array(arrayBuffer)

				const fileName = file.name
				const filePath = `temp/images/${fileName}`

				// Сохраняем файл изображения на диск
				try { 
					await writeFile(filePath, uint8Array, { baseDir: BaseDirectory.AppData }) 
					tempFileUrl = filePath
				} catch (e) {
					console.log('Не удалось сохранить файл:', e)
				}

				// Уменьшаем изображение до 213px по высоте
				const resizedBlob = await resizeImage(file, 213)

				// Для отображения создаём blob URL
				const blobUrl = URL.createObjectURL(resizedBlob)
				thumbnailBlobUrl = blobUrl
				
				const newImage: IDownloadedImage = {
					id,
					tempFileUrl,
					thumbnailBlobUrl
				}

				newImages.push(newImage)
			}
			
			setDownloadedImages((prev) => [...prev, ...newImages])
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