import React from "react";


function ImageViewer({ img, setModalProperties, imgStyle, marginForSpan }) {
   

   
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