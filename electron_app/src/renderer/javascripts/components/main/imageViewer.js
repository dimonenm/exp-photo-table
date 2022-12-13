import React from "react";


function imageViewer(galleryImages, index, text) {




    return (
        <>
            <div className='image-viewer'>
                <img className='image-viewer-img' onDoubleClick={dbClickHandler} src={galleryImages[0].getUrl()} style={imgStyle}></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span>{`Фото № ${index}. `}</span>{text}</div>
        </>
    );
}
export default imageViewer