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

        const arr = [...galleryImages].filter(item => {
            if (item.getIndex() !== currentGalleryImage.index) return true
            return false
        });

        arr.forEach((item, index) => {
            item.setIndex(index + 1)
        })

        setGalleryImages(arr);

        setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null, textImg: null });
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