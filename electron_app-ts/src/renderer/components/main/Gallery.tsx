import React from 'react';
import { ICurrentGalleryImage } from '../../interfaces/interfaces';

interface IGalleryDto {
    children: any[],
    galleryImages: [],
    setGalleryImages: React.Dispatch<[]>,
    currentGalleryImage: ICurrentGalleryImage,
    setCurrentGalleryImage: React.Dispatch<ICurrentGalleryImage>
}

const Gallery = ({ children, galleryImages, setGalleryImages, currentGalleryImage, setCurrentGalleryImage }: IGalleryDto): JSX.Element => {

    function dragover(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
    }
    function dragenter(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
    }
    function dragleave(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
    }
    function dragdrop(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();

        const arr = [...galleryImages].filter(item => {
            if (item.getIndex() !== currentGalleryImage.index) return true
            return false
        });

        arr.forEach((item, index) => {
            item.setIndex(index + 1)
        })

        setGalleryImages(arr);

        setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null });
    }
    return (<div
        className="gallery"
        onDragOver={dragover}
        onDragEnter={dragenter}
        onDragLeave={dragleave}
        onDrop={dragdrop}
    >{children}</div>);

}

export default Gallery;