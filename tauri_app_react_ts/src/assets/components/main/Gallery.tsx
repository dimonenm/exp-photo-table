import React from 'react'
import "./Gallery.css"
import IDownloadedImage from '../../interfaces/IDownloadedImage'
import GalleryItem from './GalleryItem'

// Определяем интерфейс пропсов
interface GalleryProps {
	downloadedImages: IDownloadedImage[]
}

const Gallery = ({ downloadedImages }: GalleryProps): React.JSX.Element => {

	const galleryItemArr = downloadedImages.map((item) => {
		return <GalleryItem image={item} hiden={false} />
	})

	return <div className="gallery">{galleryItemArr}</div>
}

export default Gallery