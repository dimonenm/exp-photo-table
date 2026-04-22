import React, { Dispatch, SetStateAction } from 'react'
import { writeFile, mkdir, exists, BaseDirectory } from '@tauri-apps/plugin-fs'
// import { appDataDir } from '@tauri-apps/api/path'

import './MenuItem.css'

//импортирование интерфейсов
import IDownloadedImage from '../../interfaces/IDownloadedImage'
import IPhotoTableData from '../../interfaces/IPhotoTableData'
import IModalProperties from '../../interfaces/IModalProperties'

// Определяем интерфейс пропсов
interface MenuItemProps {
  type: 'forInputFile' | 'forSetPhotoTableData'
  setDownloadedImages?: Dispatch<SetStateAction<IDownloadedImage[]>>
  photoTableData?: IPhotoTableData
  setModalProperties?: Dispatch<SetStateAction<IModalProperties>>
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode
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
        blob => {
          URL.revokeObjectURL(blobUrl)
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        },
        file.type,
        0.9, // качество JPEG
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(blobUrl)
      reject(new Error('Failed to load image'))
    }

    img.src = blobUrl
  })
}

// Функция загрузки изображений
async function loadImages(
  files: FileList | null,
  setDownloadedImages: Dispatch<SetStateAction<IDownloadedImage[]>>,
  setIsLoading?: Dispatch<SetStateAction<boolean>>,
): Promise<void> {
  setIsLoading?.(true)
  if (!files) return

  const dirExists = await exists('temp/images', {
    baseDir: BaseDirectory.AppData,
  })
  if (!dirExists) {
    try {
      await mkdir('temp/images', {
        baseDir: BaseDirectory.AppData,
        recursive: true,
      })
    } catch (e) {
      console.log('Не удалось создать директорию по адресу temp/images')
      console.log('Возникла ошибка:', e)
    }
  } else {
    console.log('Директория temp/images уже существует')
  }

  const newImages: IDownloadedImage[] = []

  for (let i = 0; i < files.length; i++) {
    const id: string = crypto.randomUUID()
    const file = files[i]

    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    const fileName = file.name
    const filePath = `temp/images/${fileName}`

    let tempFileUrl: string = ''

    try {
      await writeFile(filePath, uint8Array, { baseDir: BaseDirectory.AppData })
      tempFileUrl = filePath
    } catch (e) {
      console.log('Не удалось сохранить файл:', e)
    }

    const resizedBlob = await resizeImage(file, 213)
    const thumbnailBlobUrl = URL.createObjectURL(resizedBlob)

    const newImage: IDownloadedImage = {
      id,
      name: fileName,
      tempFileUrl,
      thumbnailBlobUrl,
    }

    newImages.push(newImage)
  }
  setIsLoading?.(false)
  setDownloadedImages(prev => [...prev, ...newImages])
}

// Функция открытия модального окна данных фототаблицы
function openPhotoTableModal(
  setModalProperties: Dispatch<SetStateAction<IModalProperties>>,
): void {
  setModalProperties({
    isOpen: true,
    type: 'photoTableData',
  })
}

const MenuItem: React.FC<MenuItemProps> = ({
  type,
  setDownloadedImages,
	setModalProperties,
	setIsLoading,
  children,
}): React.JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()

    switch (type) {
      case 'forInputFile': {
        const input = document.createElement('input')
        input.type = 'file'
        input.multiple = true
        input.accept = 'image/*'

        input.onchange = async event => {
          const files = (event.target as HTMLInputElement).files
          if (setDownloadedImages) {
            await loadImages(files, setDownloadedImages, setIsLoading )
          }
        }

        input.click()
        break
      }

      case 'forSetPhotoTableData': {
        if (setModalProperties) {
          openPhotoTableModal(setModalProperties)
        }
        break
      }

      default:
        console.warn(`Unknown MenuItem type: ${type}`)
    }
  }

  return (
    <div className='menu-item'>
      <a href='/' onClick={handleClick}>
        {children}
      </a>
    </div>
  )
}

export default MenuItem
