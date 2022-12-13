import React from "react";


function ImageViewer({ galleryImages, img, index, text, setModalProperties }) {
    console.log('view', galleryImages[0].getUrl());

    let imgStyle = {
        width: '100%',
        height: ''
    }
    if (galleryImages[0].getOrientation() === 'panorama') {
        imgStyle.width = '255px'
    }
    if (galleryImages[0].getOrientation() === 'horizontal') {
        imgStyle.width = '225px'
        // imgStyle.height = '150px'
    }
    if (galleryImages[0].getOrientation() === 'vertical') {
        imgStyle.width = '130px'
        imgStyle.height = '175px'
    }





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
                <img className='image-viewer-photo' onDoubleClick={dbClickHandler} src={img} ></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span>{`Фото № ${index}. `}</span>{text}</div>
        </>
    );
}
export default ImageViewer