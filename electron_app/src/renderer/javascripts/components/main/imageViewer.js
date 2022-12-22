import React from "react";
import GallaryImage from '../../entities/GalleryImage';

function ImageViewer({ img, galleryImages, setGalleryImages, setModalProperties, currentGalleryImage, setCurrentGalleryImage }) {
  
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
    imgStyle.height = '114px'
    marginForSpan.marginLeft = '84px'
  }
  if (img.getOrientation() === '9X6') {
    imgStyle.height = '85px'
    marginForSpan.marginLeft = '70px'
  }

  const clickHandler = (event) => {
    event.preventDefault();
    console.log(img);
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

  function dragover(event) {
    event.preventDefault();
  }

  function dragenter(event) {
    event.preventDefault();
  }

  function dragleave(event) {
    event.preventDefault();
  }
  function dragdrop(event) {
    event.preventDefault();

    const gallaryImage = new GallaryImage()
    gallaryImage.setName(currentGalleryImage.nameImg)
    gallaryImage.setUrl(currentGalleryImage.urlImg)
    const arr = [...galleryImages];
    const index = arr.findIndex(item => {
      if (item.getIndex() === img.getIndex()) return true
      return false
    })
    
    arr.splice(index, 0, gallaryImage)
    
    arr.forEach((item, index) => {
      item.setIndex(index + 1)
    })

    setGalleryImages(arr);

    setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null, textImg: null });
  }

  return (
    <>
      <div className='image-viewer-wrapper'>
      <div className='image-viewer'>
        <img
          className='image-viewer-photo'
          style={imgStyle}
          src={img.getUrl()}
          onClick={clickHandler}
          onDoubleClick={dbClickHandler}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
          onDragOver={dragover}
          onDragEnter={dragenter}
          onDragLeave={dragleave}
          onDrop={dragdrop}

          draggable="true"
        ></img>
      </div>
      <div className='image-viewer-photo-description'>
        <span style={marginForSpan}>{`Фото № ${img.getIndex()}. `}</span>
        {img.getImgDesc()}
        </div>
      </div>
    </>
  );
}

export default ImageViewer