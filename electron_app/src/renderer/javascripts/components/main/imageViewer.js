import React from "react";


function ImageViewer({ img, setModalProperties }) {

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
        <img className='image-viewer-photo' onDoubleClick={dbClickHandler} src={img.getUrl()} ></img>
      </div>
      <div className='image-viewer-photo-description'>
        <span>{`Фото № ${img.getIndex()}. `}</span>{img.getImgDesc()}</div>
    </>
  );
}

export default ImageViewer