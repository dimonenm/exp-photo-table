import React from 'react';
import GallaryImage from '../../entities/GalleryImage';


const WorkplaceItemNew = ({ name, currentGalleryImage, setCurrentGalleryImage, galleryImages, setGalleryImages }) => {

    function dragover(event) {
        event.preventDefault();
    }

    function dragenter(event) {
        event.target.classList.add('workplace-item-new-hovered');
    }

    function dragleave(event) {
        event.target.classList.remove('workplace-item-new-hovered');
    }

    function dragdrop(event) {
        event.preventDefault();
        event.target.classList.remove('workplace-item-new-hovered');
        
        const gallaryImage = new GallaryImage()
        gallaryImage.setName(currentGalleryImage.nameImg)
        gallaryImage.setUrl(currentGalleryImage.urlImg)
        const arr = [...galleryImages];
        gallaryImage.setIndex(arr.length + 1);
        arr.push(gallaryImage);        

        setGalleryImages(arr);
        setCurrentGalleryImage({ nameImg: null, urlImg: null });
    }

    return (
        <div className="workplace-item-new"
            onDragOver={dragover}
            onDragEnter={dragenter}
            onDragLeave={dragleave}
            onDrop={dragdrop}
        >
            <div className="workplace-item-name" >{name}</div>
            <div className="workplace-item-plus" ></div>
        </div>
    );
}

export default WorkplaceItemNew;