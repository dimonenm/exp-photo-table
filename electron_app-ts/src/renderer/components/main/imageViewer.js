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
    imgStyle.width = '100%'
    marginForSpan.marginLeft = '0'
  }
  if (img.getOrientation() === 'horizontal' && img.getImgCuted()) {
    imgStyle.height = '143px'
    marginForSpan.marginLeft = '32px'
  }
  if (img.getOrientation() === 'vertical') {
    imgStyle.height = '170px'
    marginForSpan.marginLeft = '63px'
  }
  if (img.getOrientation() === '6X9') {
    imgStyle.height = '113px'
    // imgStyle.height = '130px'
    marginForSpan.marginLeft = '85px'
  }
  if (img.getOrientation() === '9X6') {
    imgStyle.height = '85px'
    marginForSpan.marginLeft = '70px'
  }

  const isCuted = img.getImgCuted()

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
    setCurrentGalleryImage(prev => { return {...prev, index: img.getIndex(), nameImg: img.getName(), urlImg: img.getUrl() } });
  }
  const dragEndHandler = (event) => {
    setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null });
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

    let arr = [...galleryImages];
    
    const index = arr.findIndex(item => {
      if (item.getIndex() === img.getIndex()) return true
      return false
    })

    arr = arr.filter(item => {
      if (item.getIndex() !== currentGalleryImage.index) return true
      return false
    });

    arr.splice(index, 0, gallaryImage)

    arr.forEach((item, index) => {
      item.setIndex(index + 1)
    })

    setGalleryImages(arr);

    setCurrentGalleryImage({ index: null, nameImg: null, urlImg: null });
  }

  return (
    <>
      <div className='image-viewer-wrapper'>
        <div className='image-viewer' style={imgStyle}>
          {!isCuted ? <div className='image-viewer-scissors'></div> : null}
          <img
            className='image-viewer-photo'
            src={img.getUrl()}
            
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