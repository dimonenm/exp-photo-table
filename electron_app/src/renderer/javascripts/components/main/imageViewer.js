import React from "react";


function imageViewer(galleryImages, index, text) {




    return (
        <>
            <div className='image-viewer'>
                <img className='image-viewer-photo' src={galleryImages[0].getUrl()} ></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span>{`Фото № ${index}. `}</span>{text}</div>
        </>
    );
}
export default imageViewer