import React from "react";


function ImageViewer({ img, setModalProperties }) {

    const imgStyle = {
        width: '255px'
    }
    const marginForSpan = {
        marginLeft: '62px'
    }
    if (img.getOrientation() === 'panorama') {
        imgStyle.width = '255px'
        marginForSpan.marginLeft = '0'
    }
    if (img.getOrientation() === 'horizontal' && img.getImgCuted()) {
        imgStyle.width = '225px'
        marginForSpan.marginLeft = '15px'
    }
    if (img.getOrientation() === 'vertical') {
        imgStyle.width = '130px'
        marginForSpan.marginLeft = '62px'
    }
    if (img.getOrientation() === '6X9') {
        imgStyle.width = '95px'
        marginForSpan.marginLeft = '80px'
    }
    if (img.getOrientation() === '9X6') {
        imgStyle.width = '135px'
        marginForSpan.marginLeft = '60px'
    }

    const dbClickHandler = (event) => {
        event.preventDefault();
        setModalProperties(prev => {
            return (
                {
                    ...prev,
                    isOpen: true,
                    type: "editPhoto",
                    indexImgInGallery: img.getIndex()
                }
            );
        }
        )
    }

    return (
        <>
            <div className='image-viewer'>
                <img className='image-viewer-photo' onDoubleClick={dbClickHandler} src={img.getUrl()} style={imgStyle} ></img>
            </div>
            <div className='image-viewer-photo-description'>
                <span style={marginForSpan}>{`Фото № ${img.getIndex()}. `} </span>{img.getImgDesc()}</div>
        </>
    );
}
export default ImageViewer