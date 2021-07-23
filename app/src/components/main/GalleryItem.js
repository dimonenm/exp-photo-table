import React from 'react';

const GalleryItem = ({ name }) => {
    return (
        <div className="gallery-item">
            <div className="gallery-item-name">{name}</div>
            <div className="gallery-item-img"></div>
        </div>
    );
}

export default GalleryItem;