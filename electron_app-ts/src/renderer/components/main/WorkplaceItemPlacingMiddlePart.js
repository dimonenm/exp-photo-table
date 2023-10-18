import React from 'react';
import GallaryImage from '../../entities/GalleryImage';

const WorkplaceItemPlacingMiddlePart = ({ index, galleryImages, setGalleryImages, currentGalleryImage, setCurrentGalleryImage }) => {

  function dragover(event) {
    event.preventDefault();
  }

  function dragenter(event) {
    event.target.classList.add('workplace-item-middle-part-hovered');
  }

  function dragleave(event) {
    event.target.classList.remove('workplace-item-middle-part-hovered');
  }

  function dragdrop(event) {
    event.preventDefault();
    event.target.classList.remove('workplace-item-middle-part-hovered');

    const arr = [...galleryImages];

    const gallaryImage = new GallaryImage()
    gallaryImage.setName(currentGalleryImage.nameImg)
    gallaryImage.setUrl(currentGalleryImage.urlImg)

    let indexCounter = 1
    
    arr.splice(index, 0, gallaryImage)    
    arr.forEach((item) => {
      item.setIndex(indexCounter)
      indexCounter++
    })
    
    setGalleryImages(arr);
    setCurrentGalleryImage({ nameImg: null, urlImg: null });
  }

  return (
    <div className="workplace-item-middle-part"
      onDragOver={dragover}
      onDragEnter={dragenter}
      onDragLeave={dragleave}
      onDrop={dragdrop}
    />
  );
}

export default WorkplaceItemPlacingMiddlePart;