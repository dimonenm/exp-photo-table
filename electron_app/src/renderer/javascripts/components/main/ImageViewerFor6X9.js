import React from "react";


function ImageViewerFor6X9({ img, setModalProperties }) {


    const imgStyle = {
        width: '255px'
    }
    const marginForSpan = {
        marginLeft: '62px'
    }

    if (img.getOrientation() === '6X9') {
        imgStyle.width = '205px'
        marginForSpan.marginLeft = '50px'
        // imgStyle.height = '175px'
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
            <div className='image-viewer-wrapper-for6X9'>
                <div className='image-viewer-for6X9'>
                    <img className='image-viewer-for6X9-photo' onDoubleClick={dbClickHandler} src={img.getUrl()} style={imgStyle} ></img>
                </div>
                <div className='.image-viewer-photo-description-for6X9'>
                    <span style={marginForSpan}>{`Фото № ${img.getIndex()}. `} </span>{img.getImgDesc()}</div>
            </div>
        </>
    );
}
export default ImageViewerFor6X9