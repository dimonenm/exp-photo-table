import React from "react";


function ImageViewer({ galleryImages, img, index, text }) {
console.log('view', galleryImages[0].getUrl());

    return (
        <>
            <div className='image-viewer'>
                <img className='image-viewer-photo' src={img} ></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span>{`Фото № ${index}. `}</span>{text}</div>
        </>
    );
}
export default ImageViewer