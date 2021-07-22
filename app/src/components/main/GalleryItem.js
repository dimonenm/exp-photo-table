import React from 'react';

const GalleryItem = ({ name }) => {

    return (
        <div class="gallery-item">
            <div class="gallery-item-name">{name}</div>
            <div class="gallery-item-img"></div>
        </div>
    );
}

export default GalleryItem;