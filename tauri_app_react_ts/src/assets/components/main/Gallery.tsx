import React from 'react'
import "./Gallery.css"
import IDownloadedImage from '../../interfaces/IDownloadedImage'
import GalleryItem from './GalleryItem'

// Определяем интерфейс пропсов
interface GalleryProps {
  downloadedImages: IDownloadedImage[]
  isLoading?: boolean
	isError?: boolean
}

const Gallery = ({
  downloadedImages,
  isLoading = false,
}: GalleryProps): React.JSX.Element => {
  const galleryItemArr = downloadedImages.map(item => {
    return <GalleryItem image={item} hiden={false} />
  })

  return (
    <div className='gallery'>
      {isLoading && (
        <div className='gallery-loader'>
          <div className='spinner'></div>
          <span>Загрузка...</span>
        </div>
      )}
      {galleryItemArr}
    </div>
  )
}

export default Gallery