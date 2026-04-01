import React from 'react'
import "./GalleryItem.css"
import IDownloadedImage from '../../interfaces/IDownloadedImage'

interface GalleryItemProps {
	image: IDownloadedImage
	hiden: boolean
}

const GalleryItem: React.FC<GalleryItemProps> = ({
	image,
	hiden
}) => {
	const shortName = image.name.length > 20 ? image.name.substring(0, 20) + '...' : ''

	const displayName = shortName || image.name

	if (hiden) {
		return (
			<div className="gallery-item gallery-item-hide" draggable={false}>
				<div className="gallery-item-name">{displayName}</div>
				<div className="gallery-item-img">
					<img src={image.thumbnailBlobUrl} alt={image.name} draggable={false} />
				</div>
			</div>
		)
	}

	return (
		<div
			className="gallery-item"
			draggable={true}
		>
			<div className="gallery-item-name">{displayName}</div>
			<div className="gallery-item-img">
				<img src={image.thumbnailBlobUrl} alt={image.name} draggable={false} />
			</div>
		</div>
	)
};

export default GalleryItem