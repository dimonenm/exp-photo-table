import { useEffect, useRef } from 'react'
import { readFile, BaseDirectory } from '@tauri-apps/plugin-fs'

interface ImageItemProps {
  fileName: string
}

async function loadImageFromDisk(fileName: string): Promise<string> {
  const filePath = `temp/images/${fileName}`
  const fileData = await readFile(filePath, { baseDir: BaseDirectory.AppData })
  const blob = new Blob([fileData], { type: 'image/jpeg' })
  return URL.createObjectURL(blob)
}

const ImageItem = ({ fileName }: ImageItemProps): React.JSX.Element => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const loadImage = async () => {
      if (!imgRef.current) return

      try {
        // Очищаем старый blob
        if (imgRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(imgRef.current.src)
        }

        const url = await loadImageFromDisk(fileName)
        imgRef.current.src = url
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    }

    loadImage()

    return () => {
      if (imgRef.current?.src.startsWith('blob:')) {
        URL.revokeObjectURL(imgRef.current.src)
      }
    }
  }, [fileName])

  return <img ref={imgRef} alt="Фото" />
}

export default ImageItem