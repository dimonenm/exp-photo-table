import React from "react";

function ImageViewer({ img, setModalProperties, setCurrentGalleryImage }) {

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
    // imgStyle.height = '150px'
  }
  if (img.getOrientation() === 'vertical') {
    imgStyle.width = '130px'
    marginForSpan.marginLeft = '62px'
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

  const dragStartHandler = (event) => {
    setCurrentGalleryImage({ index: img.getIndex(), nameImg: img.getName(), urlImg: img.getUrl(), textImg: null });
  }

  const dragEndHandler = (event) => {
    setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null, textImg: null });
  }

  return (
    <>
      <div className='image-viewer'>
        <img
          className='image-viewer-photo'
          src={img.getUrl()}
          style={imgStyle}
          onDoubleClick={dbClickHandler}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
          draggable="true"
        ></img>
      </div>
      <div className='image-viewer-photo-description'>
        <span style={marginForSpan}>{`Фото № ${img.getIndex()}. `}</span>
        {img.getImgDesc()}
      </div>
    </>
  );
}

export default ImageViewer