import React from 'react';

const Gallery = ({ children, galleryImages, setGalleryImages, currentGalleryImage, setCurrentGalleryImage }) => {
   
    function dragover(event) {
        event.preventDefault();
    }

    function dragenter(event) {
        event.preventDefault();
    }

    function dragleave(event) {
        event.preventDefault();
    }
    function dragdrop(event) {
        event.preventDefault();
        // event.target.classList.remove('workplace-item-new-hovered');

        // const gallaryImage = new GallaryImage()
        // gallaryImage.setName(currentGalleryImage.nameImg)
        // gallaryImage.setUrl(currentGalleryImage.urlImg)
        // const arr = [...galleryImages];
        // gallaryImage.setIndex(arr.length + 1);
        // arr.push(gallaryImage);

        // setGalleryImages(arr);

        console.log('currentGalleryImage', currentGalleryImage);
        console.log('galleryImages', galleryImages);
        setCurrentGalleryImage({ nameImg: null, urlImg: null, textImg: null });
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