import React from 'react';

const WorkplaceItemNew = ({ name, currentGalleryImage, galleryImages, setGalleryImages }) => {

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
        console.log('WorkplaceItemNew', currentGalleryImage);
        
        const arr = [...galleryImages]
        arr.push(currentGalleryImage)
        setGalleryImages(arr)
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