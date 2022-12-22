import React from "react";


function ImageViewer({ img, setModalProperties }) {

    const imgStyle = {
        width: '',
        height: ''
    }
    const marginForSpan = {
        marginLeft: '62px'
    }
    if (img.getOrientation() === 'panorama') {
        marginForSpan.marginLeft = '0'
    }
    if (img.getOrientation() === 'horizontal' && img.getImgCuted()) {
        imgStyle.height = '143px'
        marginForSpan.marginLeft = '20px'
    }
    if (img.getOrientation() === 'vertical') {
        imgStyle.height = '170px'
        marginForSpan.marginLeft = '63px'
    }
    if (img.getOrientation() === '6X9') {
        imgStyle.height = '130px'
        marginForSpan.marginLeft = '78px'
    }
    if (img.getOrientation() === '9X6') {
        imgStyle.height = '85px'
        marginForSpan.marginLeft = '70px'
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
            <div className='image-viewer-wrapper'>
                <div className='image-viewer' style={imgStyle}>
                    <img className='image-viewer-photo' onDoubleClick={dbClickHandler} src={img.getUrl()} ></img>
                </div>
                <div className='image-viewer-photo-description'>
                    <span style={marginForSpan}>{`Фото № ${img.getIndex()}. `} </span>{img.getImgDesc()}</div>
            </div>

        </>
    );
}
export default ImageViewer