import React from 'react';

const WorkplaceItemNew = ({ name, currentGalleryImage, galleryImages, setGalleryImages, downloadedImages, setDownloadedImages }) => {

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

        const arr = [...galleryImages]
        arr.push(currentGalleryImage)
        console.log(currentGalleryImage);
        console.log(downloadedImages);

        const testarr = downloadedImages.map(item => {
            if (item.nameImg === currentGalleryImage.name) {
                console.log('ok');
            }
            return item;
        })

        console.log(testarr);

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