import React from "react";


function ImageViewer(galleryImages, index, img, text, src) {




    return (
        <>
            <div className='image-viewer'>
                <img className='image-viewer-photo' src={src} ></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span>{`Фото № ${index}. `}</span>{text}</div>
        </>
    );
}
export default ImageViewer