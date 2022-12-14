import React from "react";


function ImageViewer({ galleryImages, img, index, text, setModalProperties, imgStyle, marginForSpan }) {
    console.log('view', galleryImages[0].getUrl());

   





    const dbClickHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: index
                }
            );
        }
        )
    }


    return (
        <>
            <div className='image-viewer'>
                <img className='image-viewer-photo' onDoubleClick={dbClickHandler} src={img} style={imgStyle} ></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span style={marginForSpan}>{`Фото № ${index}. `} </span>{text}</div>
        </>
    );
}
export default ImageViewer